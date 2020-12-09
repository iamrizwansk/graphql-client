import React, {useState} from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import _ from 'lodash'


function PostForm() {
    const [errors, setErrors] = useState('')
    
    const { onChange, onSubmit, values } = useForm(postFormCallback, { body: '' })

    const [createPost] = useMutation(CREATE_POST_MUTATION,
        {
            variables: values,
            update(proxy, result) {
                const data = _.cloneDeep(proxy.readQuery({ query: FETCH_POSTS_QUERY }))
                data.getPosts.unshift(result.data.createPost)
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
                values.body = ''
            },
            onError(err) {
                  setErrors(err.graphQLErrors[0].message)
            }
        })

    function postFormCallback() {
        createPost()
    }
    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post</h2>
                <Form.Field>
                    <Form.Input
                        name='body'
                        type='text'
                        onChange={onChange}
                        value={values.body}
                        placeholder="Write Post.."
                        error={errors ? true : false}
                    />
                    <Button type='submit' color='teal'>Post</Button>
                </Form.Field>
            </Form>
            {errors && <div className="ui error message" style={{marginBottom: 20}}>
                <ul className="list">
                    <li>{errors}</li>
                </ul>
            </div>}
        </>)
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!) {
    createPost(body: $body){
        username
        body
        id
        createdAt
        comments {
            id 
            body
            createdAt
            username
        }
        likes {
            id
            createdAt
            username
        }
        commentsCount
        likesCount
    }
}

`

export default PostForm