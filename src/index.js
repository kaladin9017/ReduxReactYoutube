import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_detail';
require('./console.frog.js')
const API_KEY= "AIzaSyDXG0ix7GCK3i4l52t-XsY-_8pw3MBiL08";

class App extends Component {

  constructor (props) {
    super (props)

    this.state = {videos: []};

    this.videoSearch("surfboard");

  }

  handleSelect(video) {
    this.setState({selectedVideo: video})
  }

  videoSearch(term) {

    YTSearch( {key: API_KEY, term: term} , (videos) => {
      this.setState(
        {
          videos: videos,
          selectedVideo: videos[0]
        } )
    });

  }

  render () {
    console.frog("stuff")
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500)

    return(
      <div>
        <div id="top">
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={this.handleSelect.bind(this)}
          videos={this.state.videos}
          />
      </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.querySelector('.container'))
