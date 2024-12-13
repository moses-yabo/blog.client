import React from "react";
import Post from "../../components/Post/Post";
import { useQuery,gql } from "@apollo/client";

const GET_POST = gql`
query Post{
  posts {
    id
    title
    content
    published
    created_at
    user {
      name
    }
  }
}
`
export default function Posts () {
  const {data, error,loading} = useQuery(GET_POST);
  
  error && <p> you ran into an error </p>;
  loading && <p> I am loading.....</p>;
  
  return <> 
        {
           data && data.posts.map((post)=>{
              return <Post key={post.id} 
                           title={post.title}
                           content={post.content} 
                           date={post.created_at}
                           user={post.user.name}
                           published={post.published}
                           id={post.id}
                           isMyProfile={post.user.isMyProfile}
                           />
            })
        }
        </>;
}
