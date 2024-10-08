import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                blue: {
                    600: '#014868',
                }
            }
        }
    }
}