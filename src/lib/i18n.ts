class Internationalization {
  t(key: string): string | undefined {
    switch (key) {
      case 'READY_CHECK':
        return 'A ready check has been requested.'

      case 'MATCH_FOUND':
        return 'Your game is ready.'
    }
  }
}

export const i18n = new Internationalization()
