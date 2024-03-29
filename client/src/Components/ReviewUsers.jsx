import React from "react"
import {Grid, Paper, Avatar, Typography} from "@mui/material"
import "../Styling/ReviewUsers.css"
import user1 from "../assets/images/user1.jpg"
import user2 from "../assets/images/user2.jpg"
import couple from "../assets/images/couple.jpg"

const ReviewUsers = () => {
    return (
        <>

        <Grid style={{background: "linear-gradient(180deg, #8F9495, #eeeeee)"}}>
			<div class="container">
                <div class="mgb-40 padb-30 auto-invert line-b-4 align-center">
                    <h1 class="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg" contenteditable="false">Read User Reviews</h1>
                </div>
                <ul class="hash-list cols-3 cols-1-xs pad-30-all align-center text-sm">
                    <li>
                    <img src={user1} class="wpx-100 img-round mgb-20" title="" alt="" data-edit="false" data-editor="field" data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"/>
                    <p class="fs-110 font-cond-l" contenteditable="false">" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. "</p>
                    <h5 class="font-cond mgb-5 fg-text-d fs-130" contenteditable="false">Martha Stewart</h5>
                    <small class="font-cond case-u lts-sm fs-80 fg-text-l" contenteditable="false">Business Woman - New York</small>
                    </li>
                    <li>
                    <img src={user2} class="wpx-100 img-round mgb-20" title="" alt="" data-edit="false" data-editor="field" data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"/>
                    <p class="fs-110 font-cond-l" contenteditable="false">" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. "</p>
                    <h5 class="font-cond mgb-5 fg-text-d fs-130" contenteditable="false">Ariana Menage</h5>
                    <small class="font-cond case-u lts-sm fs-80 fg-text-l" contenteditable="false">Recording Artist - Los Angeles</small>
                    </li>
                    <li>
                    <img src={couple} class="wpx-100 img-round mgb-20" title="" alt="" data-edit="false" data-editor="field" data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"/>
                    <p class="fs-110 font-cond-l" contenteditable="false">" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. "</p>
                    <h5 class="font-cond mgb-5 fg-text-d fs-130" contenteditable="false">Sean Carter</h5>
                    <small class="font-cond case-u lts-sm fs-80 fg-text-l" contenteditable="false">Fund Manager - Chicago</small>
                    </li>
                </ul>
              </div>
		
        </Grid>
        </>
    )
}

export default ReviewUsers;