const fs = require('node:fs/promises')
const path = require('node:path')

/**
 * @type {Record<'source' | 'target', string>[]}
 */
const tasks = [
  {
    source: './themes/_config.yml',
    target: './node_modules/hexo-theme-amazing/_config.yml',
  },
]

Promise.allSettled(
  tasks.map((task) =>
    fs.copyFile(
      path.resolve(process.cwd(), task.source),
      path.resolve(process.cwd(), task.target),
      fs.constants.COPYFILE_FICLONE,
    ).catch((error) => {
      console.error(error)
    })
  )
)
