import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

// TODO(ducnm): Need to recheck because this settings didn't apply yet
export default <Partial<Config>>{
  theme: {
    colors: {
        red: '#ed1c25'
    },
    extend: {
      colors: {
        primary: colors.red,
      },
    },
  },
}
