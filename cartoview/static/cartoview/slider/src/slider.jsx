import './app.css'

import React, { Component } from 'react'

import Img from 'react-image'
import Slider from 'react-slick'
import Spinner from 'react-spinkit'
import { render } from 'react-dom'

export default class FeaturedAppsSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apps: [],
            loading:true
        }
    }
    loadApps = () => {
        const url = FEATURED_URL + "?type=app&featured=true"
        fetch(url).then((response) => response.json()).then((data) => {
            this.setState({
                apps: data,loading:false
            })
        })
    }
    componentWillMount() {
        this.loadApps()
    }
    render() {
        let { apps,loading } = this.state
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 2000
        };
        return (
            <div className=" col-xs-12 col-sm-12  col-md-12">
                {!loading && apps.length>0 && <Slider {...settings}>
                    {apps.map((app, i) => {
                        return <div key={i} style={{ paddingLeft: 5, paddingRight: 5 }}><div className="slider-container">
                            <a href={app.urls.view}>
                                <Img
                                    src={[
                                        app.thumbnail,
                                        `/static/${app.app_name}/logo.png`
                                    ]}
                                    className="slider-image"
                                    style={{ width: "100%",height:"auto" }}
                                    loader={<Spinner name="line-scale" />}
                                />
                                <div className="slider-middle">
                                    <span style={{ whiteSpace: "pre-line" }}><small>{app.title}</small></span><br />
                                    <span style={{ whiteSpace: "pre-line" }} className="label label-primary">{app.app}</span>
                                </div></a>
                        </div></div>

                    })}

                </Slider>}
                {loading && <Spinner name="line-scale" />}
                {!loading && apps.length == 0 && <h3>{"No Featured Apps"}</h3>}
            </div>
        )
    }
}
render(<FeaturedAppsSlider />, document.getElementById("featured-apps"))
