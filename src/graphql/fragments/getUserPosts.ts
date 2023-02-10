import {gql} from '@apollo/client'

export const GET_USER_POSTS = gql`
query AccountById($accountByIdId: String!) {
    accountById(id: $accountByIdId) {
      id
      followersCount
      followingAccountsCount
       profileSpace {
         about
         name
         tagsOriginal
         image
         followersCount
         id
         interestsOriginal
         
       }
      posts {
        body
        title
        appId
        createdAtTime
        image
        id
        isComment
        upvotesCount
      downvotesCount
        __typename
        createdByAccount {
          id
        }
      }
      followers {
        followerAccount {
          id
          ownedPostsCount
          activities {
            id
          }
        }
      }
    }
  }
`