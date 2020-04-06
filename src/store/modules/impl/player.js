
const READ_TO_PLAY = "READ_TO_PLAY";
const PLAYING = "PLAYING";
const PAUSED = "PAUSED";
const NO_ONE_AUDIO = "NO_ONE_AUDIO";
const LOADING = "LOADING";

class MusicPlayer {

    constructor() {
        this.playlist = [];
        this.currentIndexPlaylist = 0;
        this.currentAudio = null;
        this.currentState = new NoneAudio();
        this.updateTimeListener = null;
        this.endedEventListener = null;
    }

    addToPlayerAndPlay(audio) {

        if (audio == null)
            throw "Can't play Null audio";

        if (this.isPlaying()) {
            console.log('Reseting current audio!');
            this.reset();
        }

        let audioToPlay = null;
        let audioAlreadyInPlaylist = this.playlist.find((a) => a.id == audio.id);

        if (audioAlreadyInPlaylist) {
            console.log(`Audio ${audioAlreadyInPlaylist} is already on playlist`);
            audioToPlay = audioAlreadyInPlaylist;

            let isThisAudioId = (a) => a.id == audioAlreadyInPlaylist.id;
            let indexOfAudioInPlayslit = this.playlist.findIndex(isThisAudioId);
            this.currentIndexPlaylist = indexOfAudioInPlayslit;
        } else {
            audioToPlay = this.addToPlaylist(audio);

            if (this.updateTimeListener != null)
                audioToPlay.audioInstance.addEventListener('timeupdate', this.updateTimeListener);

            if (this.endedEventListener != null)
                audioToPlay.audioInstance.addEventListener('ended', this.endedEventListener);

            this.currentIndexPlaylist = this.playlist.length - 1;
        }

        this._setCurrentAudio(audioToPlay);
        this._setState(READ_TO_PLAY);
        this.play();

        console.log(this);
    }

    addToPlaylist(audio) {

        if (audio == null)
            throw "Can't add null audio do playlist";

        let convertedAudio = this._convertAudio(audio);
        this.playlist.push(convertedAudio);

        return convertedAudio;
    }

    async play() {
        if (this.isReadToPlay() || this.isPaused()) {
            this._setState(LOADING);
            await this.currentAudio.audioInstance.play();
            this._setState(PLAYING);
        }
    }

    pause() {
        if (!this.isPlaying)
            return;
        this.currentAudio.audioInstance.pause();
        this._setState(PAUSED);
    }

    reset() {
        this.currentAudio.audioInstance.pause();
        this.currentAudio.audioInstance.currentTime = 0;
        this._setState(READ_TO_PLAY);
    }

    next() {
        
        if (this.isPlaylistEmpty())
            return;

        let countAudiosInPlaylist = this.playlist.length;

        if (this.currentIndexPlaylist < countAudiosInPlaylist - 1) {
            this.currentIndexPlaylist++;
        } else {
            this.currentIndexPlaylist = 0;
        }

        let itWasPlaying = this.isPlaying();
        
        if(itWasPlaying){
            this.pause();
        }

        this._setCurrentAudio(this.playlist[this.currentIndexPlaylist]);
        
        if (itWasPlaying) {
            this.play(this.currentAudio);
        }
    }

    previous() {

        if (this.isPlaylistEmpty()) return;

        let countAudiosInPlaylist = this.playlist.length;

        if (this.currentIndexPlaylist === 0) {
            this.currentIndexPlaylist = countAudiosInPlaylist - 1;
        } else {
            this.currentIndexPlaylist--;
        }

        let itWasPlaying = this.isPlaying();
        
        if(itWasPlaying){
            this.pause();
        }

        this.currentAudio = this.playlist[this.currentIndexPlaylist];

        if(itWasPlaying)
            this.play(this.currentAudio);
    }

    setEndedEventListener(callBack) {
        this.endedEventListener = callBack;
    }

    setUpdateTimeEventListener(callBack) {
        this.updateTimeEventListener = callBack;
    }

    _setCurrentAudio(audio) {
        this.currentAudio = audio;
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
            case LOADING:
                newState = new Loading();
                break;
            default:
                break;
        }
        this.currentState = newState;
    }

    _convertAudio(audio) {

        let audioInstance = new Audio(audio.audioSource);
        audioInstance.addEventListener('timeupdate', this.updateTimeEventListener);
        audioInstance.addEventListener('ended', this.endedEventListener);

        console.log(audio);
        return {
            id: audio.id,
            title: audio.title,
            artist: audio.artist,
            audioSource: audio.audioSource,
            audioInstance: audioInstance
        };
    }

    //Getters
    getPlayed() {
        if (this.isNoneAudio())
            return 0;
        return this.currentAudio.audioInstance.duration - this.currentAudio.audioInstance.currentTime;
    }

    getDuration() {
        if(this.currentAudio != null 
            && this.currentAudio.audioInstance != null 
            && this.currentAudio.audioInstance.duration >= 0){
            console.log(`Duration: ${this.currentAudio.audioInstance.duration}`);
            return this.currentAudio.audioInstance.duration;
        }
        return 0;
    }

    getCurrentTime(){    
        if(this.currentAudio != null 
            && this.currentAudio.audioInstance != null
            && this.currentAudio.audioInstance.currentTime >= 0 ){
            console.log(`CurrentTime: ${this.currentAudio.audioInstance.currentTime}`);
            return this.currentAudio.audioInstance.currentTime;
        }
        return 0;
    }

    isPlaylistEmpty() {
        return this.playlist.length === 0;
    }

    isPlaying() {
        return this.currentState instanceof PlayingState;
    }

    isPlayingThisAudio(audio) {
        if (audio === null || this.currentAudio === null) return false;
        return audio.id === this.currentAudio.id && this.isPlaying();
    }

    isCurrentAudio(audio){
        if (audio === null || this.currentAudio === null) return false;
        return audio.id === this.currentAudio.id;
    }

    isPaused() {
        return this.currentState instanceof PausedState;
    }

    isReadToPlay() {
        return this.currentState instanceof ReadToPlay;
    }

    isNoneAudio() {
        return this.currentState instanceof NoneAudio;
    }

    isLoading(){
        return this.currentState instanceof Loading;
    }

    canPlay() {
        return this.isReadToPlay() || this.isPaused();
    }

    canPause() {
        return this.isPlaying();
    }

    canReset() {
        return !this.isReadToPlay();
    }

}

class State {
    constructor(description) {
        this.description = description;
    }
}

class PausedState extends State {
    constructor() {
        super(PAUSED);
    }
}

class PlayingState extends State {
    constructor() {
        super(PLAYING);
    }
}

class NoneAudio extends State {
    constructor() {
        super(NO_ONE_AUDIO);
    }
}

class ReadToPlay extends State {
    constructor() {
        super(READ_TO_PLAY);
    }
}

class Loading extends State {
    constructor(){
        super(LOADING);
    }
}



export default MusicPlayer;