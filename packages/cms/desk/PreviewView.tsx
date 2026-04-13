import React from 'react'

export function PreviewView({ document }: { document: any }) {
  const { displayed } = document
  
  const slug = displayed?.slug?.current
  
  // In the editor, category might be a reference or expanded
  // We try to get the slug from multiple possible locations
  const category = displayed?.category?.slug?.current || displayed?.category?._ref || 'category'
  const subcategory = displayed?.subcategory?.slug?.current || displayed?.subcategory?._ref || 'subcategory'
  
  if (!slug) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Drafting in Progress</h3>
        <p>Assign a <b>slug</b> to see the side-by-side preview.</p>
      </div>
    )
  }

  // Use our new 'Smart GPS' route to find the article by ID
  const previewUrl = `http://localhost:3000/api/preview?id=${displayed._id}`

  return (
    <iframe
      src={previewUrl}
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  )
}
