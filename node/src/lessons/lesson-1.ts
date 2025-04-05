import path from 'node:path'
import { tree } from '@/utils/tree'

tree({ path:path.join(process.cwd(), 'src') })
