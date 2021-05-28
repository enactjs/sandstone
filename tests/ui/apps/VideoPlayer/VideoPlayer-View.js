import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import {VirtualGridList} from "../../../../VirtualList";
import Button from "../../../../Button";

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const videos = {
    Sintel: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    'Big Buck Bunny': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    VideoTest: 'http://media.w3.org/2010/05/video/movie_300.mp4',
    // Purposefully not a video to demonstrate source error state
    'Bad Video Source': 'https://github.com/mderrick/react-html5video'
}

const posters = {
    Sintel: 'http://media.w3.org/2010/05/sintel/poster.png',
    'Big Buck Bunny': 'http://media.w3.org/2010/05/bunny/poster.png',
    VideoTest: 'http://media.w3.org/2010/05/video/poster.png',
    'Bad Video Source': 'http://media.w3.org/2010/05/video/poster.png'
};

const videoPlayer1 = (props) => (
    <div
        style={{
            transformOrigin: 'top',
            height: '70vh'
        }}
        id={props.id}
    >
        <VideoPlayer
            disabled={props.disabled}
            // id={props.id}
            noAutoPlay={props.noAutoPlay}
            noSlider={props.noSlider}
            poster={props.poster}
            title={props.title}
        >
            <source src={props.src} type="video/mp4" />
            <infoComponents>
                A video about some things happening to and around some characters. Very exciting stuff.
            </infoComponents>
            <MediaControls>
                {/*{!props.noButtonComponent &&*/}
                {/* <bottomComponents />*/}
                <bottomComponents>
                    {/*<VirtualGridList*/}
                    {/*    style={{height: ri.scale(240), marginTop: ri.scale(60)}}*/}
                    {/*    horizontalScrollbar={'hidden'}*/}
                    {/*    dataSize={size}*/}
                    {/*    direction="horizontal"*/}
                    {/*    itemSize={{*/}
                    {/*        minWidth: ri.scale(320),*/}
                    {/*        minHeight: ri.scale(270)*/}
                    {/*    }}*/}
                    {/*    itemRenderer={renderItem}*/}
                    {/*    spacing={ri.scale(12)}*/}
                    {/*/>*/}
                </bottomComponents>
                    <Button size="small" icon="list" />
                    <Button size="small" icon="playspeed" />
                    <Button size="small" icon="speakercenter" />
                    <Button size="small" icon="miniplayer" />
                    <Button size="small" icon="subtitle" />
                {/*}*/}
            </MediaControls>
        </VideoPlayer>
    </div>
);

const app = (props) => <div {...props}>
    {videoPlayer1({id: 'videoPlayerDefault'})}
</div>;

export default ThemeDecorator(app);