/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import Resolver, { generateMetadata as resolverMetadata } from "../../[...slug]/page";

export const generateMetadata = (props: any) => 
  resolverMetadata({ params: { slug: [props.params.category, props.params.subcategory] } });

export default (props: any) => 
  Resolver({ params: { slug: [props.params.category, props.params.subcategory] } });
