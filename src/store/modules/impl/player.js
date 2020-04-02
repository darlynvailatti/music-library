
const READ_TO_PLAY = "READ_TO_PLAY";
const PLAYING = "PLAYING";
const PAUSED = "PAUSED";
const NO_ONE_AUDIO = "NO_ONE_AUDIO";

class MusicPlayer {

    constructor() {
        this.audio = null;
        this.playlist = [];
        this.currentIndexPlaylist = 0;
        this.currentAudio = null;
        this.currentState = new NoneAudio();

    }

    addAudioToPlaylist(audio) {
        if (audio == null)
            throw "Can't add null Audio on playlist";

        this.playlist.add(audio);
        if (this.isNoneAudio()) {
            this._setState(READ_TO_PLAY);
        }
    }

    play(audio) {

        if(audio == null)
            throw "Can't play a null audio";
        
        if(this.currentAudio == null)  {
            this.currentAudio = audio;
            this._setState(READ_TO_PLAY);
        }

        if (this.isPaused() || this.isReadToPlay()){
            // this.currentAudio.play;
        }else if(this.isPlaying()){
            let isAnotherAudio = this.currentAudio.id != audio.id;
            if(isAnotherAudio){
                this.currentAudio = audio;
                //this.currentAudio.play;
            }
        }  
        
        this._setState(PLAYING);
    
    }

    pause() {
        let isPlaying = this.isPlaying();
        if(!isPlaying)
            return;
        //this.currentAudio.pause;
        this._setState(PAUSED);
    }

    reset() {
        let isReadyToPlay = this.isReadToPlay();
        if(!isReadyToPlay){
            //this.currentAudio.reset;
           this._setState(READ_TO_PLAY);
        }
    }

    next(){
        
        if(this.isPlaylistEmpty())
            return;

        let countAudiosInPlaylist = this.playlist.length;
        
        if(this.currentIndexPlaylist < countAudiosInPlaylist){
            this.currentIndexPlaylist++;
            this.currentAudio = this.playlist[this.currentIndexPlaylist];

            if(this.isPlaying()){
                this.play(this.currentAudio);
            }
        }
                
    }

    previously(){

        if(this.isPlaylistEmpty()) return;

        let countAudiosInPlaylist = this.playlist.length;
    
        if(this.currentIndexPlaylist === 0){
            this.currentIndexPlaylist = countAudiosInPlaylist - 1;
        }else{
            this.currentIndexPlaylist--;
            this.currentAudio = this.playlist[this.currentIndexPlaylist];
            this.play(this.currentAudio);
        }
    }

    canPlay(){
        return this.isReadToPlay() || this.isPaused() || this.isNoneAudio();
    }

    canPause(){
        return this.isPlaying();
    }

    canReset(){
        return !this.isReadToPlay();
    }

    _setState(state) {

        let newState;
        switch (state) {
            case READ_TO_PLAY:
                newState = new ReadToPlay();
                break;
            case PLAYING:
                newState = new PlayingState();
                break;
            case NO_ONE_AUDIO:
                newState = new NoneAudio();
                break;
            case PAUSED:
                newState = new PausedState();
                break;
            default:
                break;
        }
        this.currentState = newState;
    }

    isPlaylistEmpty(){
        return this.playlist.length === 0;
    }

    isPlaying(){
        return this.currentState instanceof PlayingState;
    }

    isPlayingThisAudio(audio){
        if(audio === null || this.currentAudio === null) return false;
        return audio.id === this.currentAudio.id && this.isPlaying();
    }

    isPaused(){
        return this.currentState instanceof PausedState;
    }

    isReadToPlay(){
        return this.currentState instanceof ReadToPlay;
    }

    isNoneAudio(){
        return this.currentState instanceof NoneAudio;
    }

}

class State {
    constructor(description){
        this.description = description;
    }
}

class PausedState extends State {
    constructor(){
        super(PAUSED);
    }
}

class PlayingState extends State {
    constructor(){
        super(PLAYING);
    }
}

class NoneAudio extends State {
    constructor(){
        super(NO_ONE_AUDIO);
    }
}

class ReadToPlay extends State {
    constructor(){
        super(READ_TO_PLAY);
    }
}


export default MusicPlayer;