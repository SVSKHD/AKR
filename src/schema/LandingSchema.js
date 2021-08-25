import Helmet from "react-helmet"


const LandingpageSchema = () =>{
return(
<>
<Helmet>
<script type="application/ld+json">
{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        "image": [
          "https://aquakart.store/static/media/Default.9c4634fa.png",
          "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1629073518/poq2qz7bhe4wowvexdab.jpg",
          "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1627018401/zytwjcfvx7n7rmgm8uaj.jpg"
        ],
        "name": "AquaKart Store",

        "url": "https://aquakart.store",
        "priceRange": "₹₹₹",
        "sameAs": [
          "https://www.instagram.com/aquakart8/",
          "https://twitter.com/aquakart8"
        ],
      "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "9182119842",
      "email": "aquakart8@gmail.com",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": [
        "te",
        "hi",
        "en"
      ]
    }
  ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "10:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "11:00",
            "closes": "18:00"
          }
        ],
        "department": [
          {
            "@type": "Water Treatment Systems",
            "image": [
              "https://aquakart.store/static/media/Default.9c4634fa.png",
              "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1629073518/poq2qz7bhe4wowvexdab.jpg",
              "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1627364353/zt2j5pdbddog48nowima.jpg"
            ],
            "name": "Aquakart Offline Store",
            "telephone": "9182119842",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "19:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "17:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "11:00",
                "closes": "17:00"
              }
            ]
          }
        ]
      })
}
</script>
</Helmet>
</>
)
}
export default LandingpageSchema
