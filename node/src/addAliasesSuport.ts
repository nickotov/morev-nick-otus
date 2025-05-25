import moduleAlias from 'module-alias'
import path from 'path'

if (process.env.NODE_ENV === 'production') {
    moduleAlias.addAliases({
        '@': path.resolve(__dirname, '..', 'dist'),
        '@app': path.resolve(__dirname, '..', 'dist', 'apps', 'best-course-ever')
    })
}