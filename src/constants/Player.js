export const Player = {
    methods: {
      ADD_TO_PLAYER_AND_PLAY: 'addToPlayerAndPlay',
      PLAY: 'play',
      PAUSE: 'pause',
      RESET: 'reset',
      PREVIOUS: 'previous',
      NEXT: 'next',
      SET_ENDED_EVENT_LISTENER: 'setEndedEventListener',
      SET_UPDATE_TIME_EVENT_LISTENER :'setUpdateTimeEventListener',
      UPDATE_CURRENT_TIME: 'updateCurrentTime',
      UPDATE_DURATION: 'updateDuration'
    },
    getters: {
      IS_ALLOW_TO_PLAY: 'isAllowToPlay',
      IS_ALLOW_TO_RESET: 'isAllowToReset',
      IS_ALLOW_TO_PAUSE: 'isAllowToPause',
      GET_CURRENT_AUDIO: 'getCurrentAudio',
      IS_PLAYING: 'isPlaying',
      IS_PAUSED: 'isPaused',
      IS_NONE_AUDIO: 'isNoneAudio',
      IS_LOADING: "isLoading",
      IS_PLAYING_THIS_AUDIO: 'isPlayingThisAudio',
      IS_CURRENT_AUDIO: 'isCurrentAudio',
      GET_PLAYED: 'getPlayed',
      GET_CURRENT_TIME: 'getCurrentTime',
      GET_DURATION: 'getDuration',
    }
  };
  