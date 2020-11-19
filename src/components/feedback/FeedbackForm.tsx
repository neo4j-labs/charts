import React, { useState, useEffect } from "react";

export const postFeedback = (body) => {
    const formData = new URLSearchParams();
    formData.append("project", "@graphapps/charts")
    formData.append("helpful", body.helpful)
    formData.append("url", `@graphapps/charts${body.page}`)

    if (body.reason) {
        formData.append("reason", body.reason)
    }

    if (body.moreInformation) {
        formData.append("moreInformation", body.moreInformation)
    }

    return fetch('https://uglfznxroe.execute-api.us-east-1.amazonaws.com/dev/Feedback', {
        method: 'post',
        body: formData,
        mode: "no-cors"
    }).then(function (response) {
        return response;
    }).then(function (data) {
        console.log(data)
    }).catch(error => {
        console.log(error)
    });
}

const reasons = {
    missing: 'It has missing information',
    'hard-to-follow': 'It’s hard to use or confusing',
    inaccurate: 'It’s inaccurate, out of date, or doesn’t work',
    other: 'Something else'
}

export const FeedbackForm = (props) => {
    const [ helpful, setHelpful ] = useState<boolean | undefined>(false)
    const [ reason, setReason ] = useState('missing')
    const [ moreInformation, setMoreInformation ] = useState('')

    const [page, setPage] = useState(props.page)
    useEffect(() => {
        setPage(props.page);
        setHelpful(undefined)
    }, [props.page])


    let colour = 'blue'
    let view

    const handleSendFeedback = () => {
        postFeedback({ page, helpful, reason, moreInformation });

        setReason('missing')
        setMoreInformation('')

        setHelpful(true)
    }

    if ( helpful === undefined ) {
        view = (
            <div className="flex p-2 font-bold">
                <h1 className="flex-grow font-bold mb-2">Is this Graph App Useful?</h1>

                <svg width="22px" height="22px" viewBox="0 0 22 22" role="button" className="no stroke-current ml-2" aria-label="No, this page isn't helpful" onClick={() => setHelpful(false)}>
                    <g fill="transparent">
                    <path d="M6.25,15.8333333 C6.25,13.7622655 7.92893219,12.0833333 10,12.0833333 C12.0710678,12.0833333 13.75,13.7622655 13.75,15.8333333"></path>
                    <circle cx="10" cy="10" r="9.58333333"></circle>
                    <path d="M12.5,4.58333333 C12.8934466,4.05873783 13.5109223,3.75 14.1666667,3.75 C14.822411,3.75 15.4398867,4.05873783 15.8333333,4.58333333"></path>
                    <line x1="4.58333333" y1="7.91666667" x2="7.08333333" y2="7.91666667"></line>
                    <path d="M7.08333333,8.54166667 C6.96827401,8.54166667 6.875,8.44839266 6.875,8.33333333 C6.875,8.21827401 6.96827401,8.125 7.08333333,8.125 C7.19839266,8.125 7.29166667,8.21827401 7.29166667,8.33333333 C7.29166667,8.44839266 7.19839266,8.54166667 7.08333333,8.54166667"></path>
                    <line x1="12.9166667" y1="7.91666667" x2="15.4166667" y2="7.91666667"></line>
                    <path d="M15.4166667,8.54166667 C15.3016073,8.54166667 15.2083333,8.44839266 15.2083333,8.33333333 C15.2083333,8.21827401 15.3016073,8.125 15.4166667,8.125 C15.531726,8.125 15.625,8.21827401 15.625,8.33333333 C15.625,8.44839266 15.531726,8.54166667 15.4166667,8.54166667"></path>
                    <path d="M4.16666667,4.58333333 C4.5601133,4.05873783 5.17758895,3.75 5.83333333,3.75 C6.48907772,3.75 7.10655337,4.05873783 7.5,4.58333333"></path>
                    </g>
                </svg>
                <svg width="22px" height="22px" viewBox="0 0 22 22" role="button" className="yes stroke-current ml-2" aria-label="Yes, this page is helpful" onClick={() => { setHelpful(true); postFeedback({ page, helpful: true }) }}>
                    <g fill="transparent">
                        <circle cx="10" cy="10" r="9.58333333"></circle>
                        <path d="M5.41666667,8.125 C5.53172599,8.125 5.625,8.21827401 5.625,8.33333333 C5.625,8.44839266 5.53172599,8.54166667 5.41666667,8.54166667 C5.30160734,8.54166667 5.20833333,8.44839266 5.20833333,8.33333333 C5.20833333,8.21827401 5.30160734,8.125 5.41666667,8.125"></path>
                        <path d="M14.5833333,8.125 C14.468274,8.125 14.375,8.21827401 14.375,8.33333333 C14.375,8.44839266 14.468274,8.54166667 14.5833333,8.54166667 C14.6983927,8.54166667 14.7916667,8.44839266 14.7916667,8.33333333 C14.7916667,8.21827401 14.6983927,8.125 14.5833333,8.125"></path>
                        <path d="M13.2275,12.9166657 C13.4853075,12.9162808 13.7287776,13.035241 13.8869095,13.2388563 C14.0450415,13.4424715 14.1000278,13.7078123 14.0358333,13.9575 C13.562901,15.7999679 11.9021969,17.0882321 10,17.0882321 C8.09780311,17.0882321 6.43709903,15.7999679 5.96416667,13.9575 C5.89997223,13.7078123 5.95495852,13.4424715 6.11309045,13.2388563 C6.27122239,13.035241 6.51469246,12.9162808 6.7725,12.9166657 L13.2275,12.9166657 Z"></path>
                    </g>
                </svg>
            </div>
        )
    }
    else if ( helpful === false ) {
        colour = 'red'

        view = (
            <div className="p-2">
                <div className="flex">
                    <h1 className="flex-grow font-bold mb-2">We're sorry to hear that...</h1>

                    <svg width="14px" height="22px" viewBox="0 0 22 22" role="button" className="cancel stroke-current" aria-label="Cancel Feedback" onClick={() => setHelpful(undefined)}><line x1="19.5833333" y1="0.416666667" x2="0.416666667" y2="19.5833333"></line><line x1="19.5833333" y1="19.5833333" x2="0.416666667" y2="0.416666667"></line></svg>
                </div>

                <div className="bg-white p-2 -mx-2 rounded-md">
                    <p className="mb-4 font-bold text-sm">How could we improve this Graph App?</p>

                    {Object.entries(reasons).map(([ key, value ]) => <div className="mb-2 text-sm" key={key}>
                        <input className="mr-2 h-4 w-4" id={`reason-${key}`} name="reason" type="radio" value={key} checked={reason === key} onChange={e => setReason(e.currentTarget.value)} />
                        <label htmlFor={`reason-${key}`}>{value}</label>
                    </div>)}

                    <div className="my-2 text-sm">
                        <label htmlFor="more" className="font-bold mb-2">More information</label>

                        <textarea id="more" rows={3} className="border border-red-300 text-red-800 text-sm w-full p-2 rounded-sm outline-none focus:border-red-400" value={moreInformation} onChange={e => setMoreInformation(e.target.value)}>{moreInformation}</textarea>
                    </div>

                    <div className="flex justify-between">
                        <button className="px-4 py-1 border border-red-600 bg-red-600 text-white rounded-sm text-sm" onClick={() => handleSendFeedback()}>Submit Feedback</button>
                        <button className="px-4 py-1 border border-red-600 text-red-600 rounded-sm text-sm" onClick={() => setHelpful(undefined)}>Skip</button>
                    </div>
                </div>
            </div>
        )
    }
    else if ( helpful === true ) {
        colour = 'green'

        view = (
            <div className="flex p-2 pb-4 font-bold">
                Great! Thank you for your feedback!
            </div>
        )
    }



    return (
        <div className={`fixed bottom-0 right-0 mx-4 -mb-2 p-2 rounded-md shadow-md bg-${colour}-200 text-${colour}-800`} style={{width: '320px'}}>
            {view}
        </div>
    )
}
