import backendFactory from './plop/backend.mjs'

export default function (plop) {
  plop.setWelcomeMessage(`
  ▄▄▌               ▄▄▄·▄▄▌  ▄▄▄ .▐▄• ▄ 
  ██•  ▪     ▪     ▐█ ▄███•  ▀▄.▀· █▌█▌▪
  ██▪   ▄█▀▄  ▄█▀▄  ██▀·██▪  ▐▀▀▪▄ ·██· 
  ▐█▌▐▌▐█▌.▐▌▐█▌.▐▌▐█▪·•▐█▌▐▌▐█▄▄▌▪▐█·█▌
  .▀▀▀  ▀█▄▀▪ ▀█▄▀▪.▀   .▀▀▀  ▀▀▀ •▀▀ ▀▀

Choose your destiny:
`)
  plop.setGenerator('backend', backendFactory(plop))
}