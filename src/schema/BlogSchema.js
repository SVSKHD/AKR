import Helmet from "react-helmet"
const BlogpageSchema = ({title , subtitle , description  , specs ,  keywords , editor , created , modified }) =>{
return(
<Helmet>
<script type="application/ld+json">
{JSON.stringify(    
{ "@context": "https://schema.org", 
 "@type": "BlogPosting",
 "headline": {title},
 "alternativeHeadline": {subtitle},
 "image": "http://example.com/image.jpg",
 "award": "Best article ever written",
 "editor": {editor}, 
 "genre": "search engine optimization", 
 "keywords": {keywords}, 
 "wordcount": "1120",
 "publisher": "Book Publisher Inc",
 "url": "http://www.example.com",
 "datePublished": "2015-09-20",
 "dateCreated": {created},
 "dateModified": {modified},
 "description": {description},
 "articleBody": {specs},
   "author": {
    "@type": "Organization",
    "name": {editor}
  }
 }
)}
</script>
</Helmet>
)
}
export default BlogpageSchema