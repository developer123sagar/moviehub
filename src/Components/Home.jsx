import React from 'react'
import Main from './Main'
import Row from './Row'
import Requests from '../Requests'

const Home = () => {
  return (
    <>
        <Main />
        <Row rowId='1' title='Trending' fetchURL = {Requests.requestTrending}/>
        <Row rowId='2' title='Recommendation' fetchURL ={Requests.requestRecommendation}/>
        <Row rowId='3' title='Popular' fetchURL = {Requests.requestPopular}/>
        <Row rowId='4' title='Top Rated' fetchURL = {Requests.requestTopRated}/>
        <Row rowId='5' title='Up coming' fetchURL = {Requests.requestUpcoming}/>
    </>
  )
}

export default Home