export const womenCollections = (linksTitle) => {
    return [
        {
            type: "turkey",
            title: linksTitle.turkeyTitle,
            links: [
                {
                    title: linksTitle.title1,
                    url: "/categories/women-fashions/turkey-dresses/dresses"
                },
                {
                    title: linksTitle.title2,
                    url: "/categories/women-fashions/turkey-lingeries/lingerie"
                },
                {
                    title: linksTitle.title3,
                    url: "/categories/women-fashions/turkey-abayas/abaya"
                },
                {
                    title: linksTitle.title4,
                    url: "/categories/women-fashions/turkey-all-products/other-products"
                }
            ]
        },
        {
            type: "local",
            title: linksTitle.localTitle,
            links: [
                {
                    title: linksTitle.title1,
                    url: "/categories/women-fashions/local-dresses/dresses"
                },
                {
                    title: linksTitle.title2,
                    url: "/categories/women-fashions/local-lingeries/lingeri"
                },
                {
                    title: linksTitle.title3,
                    url: "/categories/women-fashions/local-abayas/abaya"
                },
                {
                    title: linksTitle.title4,
                    url: "/categories/women-fashions/local-all-products/other-products"
                }
            ]
        }
    ]
}
export const kidsCollections = (linksTitle) => {
    return {
        title: linksTitle.mainTitle,
        links: [
            {
                title: linksTitle.title1,
                url: "/categories/kids-fashions/kids-pajamas/pajamas"
            },
            {
                title: linksTitle.title2,
                url: "/categories/kids-fashions/kids-dresses/dresses"
            },
            {
                title: linksTitle.title3,
                url: "/categories/kids-fashions/all-products/other-products"
            }
        ]
    }
}
export const menCollections = (linksTitle) => {
    return {
        title: linksTitle.mainTitle,
        links: [
            {
                title: linksTitle.title1,
                url: "/categories/men-fashions/men-pajamas/pajamas"
            },
            {
                title: linksTitle.title2,
                url: "/categories/men-fashions/all-products/other-products"
            }
        ]
    }
}
export const accessoriesCollections = (linksTitle) => {
    return [
        {
            type: "women",
            title: linksTitle.womenTitle,
            links: [
                {
                    title: linksTitle.title1,
                    url: "/categories/accessories/women/women-necklace/necklace"
                },
                {
                    title: linksTitle.title2,
                    url: "/categories/accessories/women/women-rings/rings"
                },
                {
                    title: linksTitle.title3,
                    url: "/categories/accessories/women/women-bracelets/bracelets"
                },
                {
                    title: linksTitle.title5,
                    url: "/categories/accessories/women/all-products/other-products"
                }
            ]
        },
        {
            type: "men",
            title: linksTitle.menTitle,
            links: [
                {
                    title: linksTitle.title4,
                    url: "/categories/accessories/men/men-watches/watches"
                },
                {
                    title: linksTitle.title5,
                    url: "/categories/accessories/men/all-products/other-products"
                }
            ]
        },
        {
            type: "kids",
            title: linksTitle.kidsTitle,
            links: [
                {
                    title: linksTitle.title5,
                    url: "/categories/accessories/kids/all-products/products"
                }
            ]
        }
    ]
}