class Sound {
  get(key: string): string | undefined {
    switch (key) {
      case 'READY_CHECK':
        return 'ready_check_no_focus.wav'

      case 'MATCH_FOUND':
        return 'match_ready_no_focus.wav'
    }
  }
}

export const sound = new Sound()
