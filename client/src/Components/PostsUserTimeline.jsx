import React, {useEffect, useState} from 'react'
import axios from 'axios'

const PostsUserTimeline = () => {

    const [userPosts, setUserPosts] = useState([]);
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));

    useEffect(() => { axios.get('http://localhost:3001/share/userPosts', {
            params: {
              username: username // înlocuiește cu variabila ta de stare
            }
        })
    .then(res => {
        if(res.data.Status === 'Success')
        {
            setUserPosts(res.data.data);
        }
        else {
            console.log(res.err);
        }
    })
    .catch(err => console.log(err))
    }, []);

    return(
        <div>
             User Posts 
             {userPosts.map(post => (
                <div key={post.postid}>
                <p>{post.description}</p>
                {/* Alte detalii ale postării */}
              </div>
             ))}
        </div>
    )

}

export default PostsUserTimeline;