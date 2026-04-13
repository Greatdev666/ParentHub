import { sanityFetch } from "./fetch";

export async function getHomepageData() {
  const featuredRaw = await sanityFetch({
    query: `*[_type == "article" && featured == true] | order(publishedAt desc)[0] {
      _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}, author->{name, image, role}
    }`,
    tags: ["article"]
  });

  // Fetch ALL featured articles for the Featured Topics carousel
  const featuredTopics = await sanityFetch({
    query: `*[_type == "article" && featured == true] | order(publishedAt desc)[0...8] {
      _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}, author->{name, image, role}
    }`,
    tags: ["article"]
  });

  // 1. Fetch Latest Articles
  const latestArticlesResult = await sanityFetch({
    query: `*[_type == "article"] | order(publishedAt desc)[0...5] {
      _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}, author->{name, image, role}
    }`,
    tags: ["article"]
  });

  const latest = {
    featured: latestArticlesResult[0] || null,
    list: latestArticlesResult.slice(1) || []
  };

  const featuredPost = featuredRaw || latestArticlesResult[0] || null;

  // 2. Fetch Team Members
  const team = await sanityFetch({
    query: `*[_type == "teamMember"] | order(_createdAt asc) {
      _id, name, role, image, bio, socialLinks
    }`,
    tags: ["teamMember"]
  });

  // 3. Fetch Categories & Articles
  const categoriesRaw = await sanityFetch({
    query: `*[_type == "category" && !defined(parent)] | order(order asc) {
      _id, title, "slug": slug.current, description, image,
      "subcategories": *[_type == "category" && parent._ref == ^._id] {
        _id, title,
        "articles": *[_type == "article" && subcategory._ref == ^._id] | order(publishedAt desc)[0...5] {
          _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
          category->{slug, title}, subcategory->{slug, title}, author->{name, image, role}
        }
      },
      "directArticles": *[_type == "article" && category._ref == ^._id && !defined(subcategory)] | order(publishedAt desc)[0...5] {
          _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
          category->{slug, title}, subcategory->{slug, title}, author->{name, image, role}
      }
    }`,
    tags: ["category", "article"]
  });

  // 4. Process Categories & Distribute
  const categories = categoriesRaw.map((cat: any, index: number) => {
    let allArticles: any[] = [];
    
    // Distribute logic from subcategories
    if (cat.subcategories && cat.subcategories.length > 0) {
      const subcats = cat.subcategories.filter((s: any) => s.articles && s.articles.length > 0);
      
      // Round-robin selection from subcategories
      let hasMore = true;
      let i = 0;
      while (hasMore && allArticles.length < 6) {
        hasMore = false;
        for (const sub of subcats) {
          if (sub.articles[i]) {
            // make sure we don't duplicate
            if (!allArticles.find(a => a._id === sub.articles[i]._id)) {
              allArticles.push(sub.articles[i]);
            }
            hasMore = true;
          }
          if (allArticles.length >= 6) break;
        }
        i++;
      }
    }

    // If we still need articles, fill from direct articles
    if (cat.directArticles) {
      for (const article of cat.directArticles) {
        if (!allArticles.find(a => a._id === article._id)) {
          allArticles.push(article);
        }
      }
    }

    // Sort ALL gathered articles by publishedAt desc to ensure actual latest is featured
    allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const featured = allArticles[0] || null;
    const articlesList = allArticles.slice(1, 6);

    return {
      title: cat.title,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      featured: featured,
      articles: articlesList,
      layout: index % 2 === 0 ? "left" : "right"
    };
  });

  return { latest, featuredPost, featuredTopics, categories, team };
}

export async function getNavCategories() {
  return sanityFetch({
    query: `*[_type == "category" && !defined(parent)] | order(order asc) {
      _id,
      title,
      description,
      image,
      "slug": slug.current,
      "subcategories": *[_type == "category" && parent._ref == ^._id] | order(order asc) {
        _id,
        title,
        "slug": slug.current
      }
    }`,
    tags: ["category"]
  });
}

export async function getFooterData() {
  const settings = await sanityFetch({
    query: `*[_type == "siteSettings"][0] {
      title,
      socialLinks
    }`,
    tags: ["siteSettings"]
  });

  const footer = await sanityFetch({
    query: `*[_type == "footerSettings"][0] {
      companyLinks,
      legalLinks,
      copyrightText
    }`,
    tags: ["footerSettings"]
  });

  const categories = await sanityFetch({
    query: `*[_type == "category" && !defined(parent)] | order(order asc) [0...7] {
      _id, title, "slug": slug.current
    }`,
    tags: ["category"]
  });

  return { settings, footer, categories };
}

export async function getCategory(slug: string) {
  return sanityFetch({
    query: `*[_type == "category" && slug.current == $slug][0]`,
    params: { slug },
    tags: ["category"]
  });
}

export async function getCategoryArticles(categorySlug: string) {
  return sanityFetch({
    query: `*[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}, author->{name, image, role}
    }`,
    params: { slug: categorySlug },
    tags: ["article"]
  });
}

export async function getSubcategoryArticles(categorySlug: string, subcategorySlug: string) {
  return sanityFetch({
    query: `*[_type == "article" && category->slug.current == $catSlug && subcategory->slug.current == $subSlug] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}, author->{name, image, role}
    }`,
    params: { catSlug: categorySlug, subSlug: subcategorySlug },
    tags: ["article"]
  });
}

export async function getArticle(slug: string) {
  return sanityFetch({
    query: `*[_type == "article" && slug.current == $slug][0] {
      ...,
      category->{slug, title}, subcategory->{slug, title}, author->{_id, name, "slug": slug.current, image, shortBio, role}
    }`,
    params: { slug },
    tags: ["article"]
  });
}

export async function getRelatedArticles(articleId: string, categorySlug: string) {
  return sanityFetch({
    query: `*[_type == "article" && _id != $articleId && category->slug.current == $slug] | order(publishedAt desc)[0...3] {
      _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}, author->{name, image}
    }`,
    params: { articleId, slug: categorySlug },
    tags: ["article"]
  });
}

export async function getPage(slug: string) {
  return sanityFetch({
    query: `*[_type == "page" && slug.current == $slug][0]`,
    params: { slug },
    tags: ["page"]
  });
}

export async function getAuthorBySlug(slug: string) {
  return sanityFetch({
    query: `*[_type == "author" && slug.current == $slug][0]`,
    params: { slug },
    tags: ["author"]
  });
}

export async function getArticlesByAuthor(authorId: string) {
  return sanityFetch({
    query: `*[_type == "article" && author._ref == $authorId] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}
    }`,
    params: { authorId },
    tags: ["article", "author"]
  });
}

export async function searchArticles(keyword: string) {
  // Using wildcard search parameter so "baby" matches "babies" partially, and searching across title, excerpt, and category name
  const wildcardKeyword = `*${keyword}*`;
  return sanityFetch({
    query: `*[_type == "article" && (title match $wildcardKeyword || excerpt match $wildcardKeyword || category->title match $wildcardKeyword)] | order(publishedAt desc)[0...20] {
      _id, title, "slug": slug.current, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}, author->{name, image}
    }`,
    params: { wildcardKeyword },
  });
}
