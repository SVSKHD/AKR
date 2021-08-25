import Helmet from "react-helmet"
const ProductSchema = ({title , editor , stock , price , subtitle , description , images , rating , ratingaverage , offers , }) =>{
return(
<Helmet>
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org/",
  "@type": {title},
  "name": {editor},
  "image": {images},
  "description": {description},
  "mpn": "925872",
  "brand": {
    "@type": "Thing",
    "name": {title}
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": {rating},
    "reviewCount": {ratingaverage}
  },
  "offers": {
    "@type": {offers},
    "priceCurrency": "INR",
    "price": {price},
    "priceValidUntil": "2020-11-05",
    "itemCondition": "Brand New",
    "availability": {stock},
    "seller": {
      "@type": "Organization",
      "name": "Aquakart | Best Budget Shopping Mart"
    }
  }
}
)}
</script>
</Helmet>

)
}
export default ProductSchema