import {graphql} from "./graphql"

// PAGE INFO *******************************************************************************************************************************
export const PageInfoFragment = graphql(`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
  }
`)

// TAG *************************************************************************************************************************************
export const TagFragment = graphql(`
  fragment Tag on Tag {
    id
    name
    slug
  }
`)

// POST ************************************************************************************************************************************
export const PostFragment = graphql(
  `
    fragment Post on Post {
      id
      slug
      url
      brief
      title
      subtitle
      hasLatexInPost
      publishedAt
      updatedAt
      readTimeInMinutes
      reactionCount
      responseCount
      publication {
        id
      }
      seo {
        title
        description
      }
      coverImage {
        url
      }
      author {
        name
        username
        profilePicture
      }
      title
      content {
        markdown
        html
      }
      ogMetaData {
        image
      }
      tags {
        ...Tag
      }
      features {
        tableOfContents {
          isEnabled
          items {
            id
            level
            parentId
            slug
            title
          }
        }
      }
      preferences {
        disableComments
      }
      comments(first: 25) {
        totalDocuments
        edges {
          node {
            id
            totalReactions
            content {
              markdown
            }
            author {
              name
              username
              profilePicture
            }
          }
        }
      }
    }
  `,
  [TagFragment]
)

// PUBLICATION *****************************************************************************************************************************
export const PublicationFragment = graphql(`
  fragment Publication on Publication {
    id
    title
    displayTitle
    url
    metaTags
    favicon
    isTeam
    followersCount
    descriptionSEO
    author {
      name
      username
      profilePicture
      followersCount
    }
    ogMetaData {
      image
    }
    preferences {
      logo
      darkMode {
        logo
      }
      disableFooterBranding
      navbarItems {
        id
        type
        label
        url
      }
    }
    links {
      twitter
      instagram
      github
      website
      hashnode
      youtube
      dailydev
      linkedin
      mastodon
    }
    integrations {
      umamiWebsiteUUID
      gaTrackingID
      fbPixelID
      hotjarSiteID
      matomoURL
      matomoSiteID
      fathomSiteID
      fathomCustomDomain
      fathomCustomDomainEnabled
      plausibleAnalyticsEnabled
    }
  }
`)

// STATIC PAGE *****************************************************************************************************************************
export const StaticPageFragment = graphql(`
  fragment StaticPage on StaticPage {
    content {
      html
    }
    hidden
    id
    ogMetaData {
      image
    }
    seo {
      description
      title
    }
    slug
    title
  }
`)