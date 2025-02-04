// import dotnetModelFactory from './plop/dotnet/model.mjs'
// import dotnetPluginFactory from './plop/dotnet/plugin.mjs'
import backendFactory from './plop/backend.mjs'
import dotnetServiceFactory from './plop/dotnet/service.mjs'
import { toCamelCase } from './plop/stringHelper.mjs'
// import dotnetWebApiFactory from './plop/dotnet/webapi.mjs'

function setPlopHelpers (plop) {
  plop.setHelper('UC', function (text) {
    if (!text) return text

    return text.toUpperCase()
  })

  plop.setHelper('LC', function (text) {
    if (!text) return text

    return text.toLowerCase()
  })

  plop.setHelper('CC', function (text) {
    return toCamelCase(text)
  })
}

export default function (plop) {
  plop.setWelcomeMessage(`
  ▄▄▌               ▄▄▄·▄▄▌  ▄▄▄ .▐▄• ▄ 
  ██•  ▪     ▪     ▐█ ▄███•  ▀▄.▀· █▌█▌▪
  ██▪   ▄█▀▄  ▄█▀▄  ██▀·██▪  ▐▀▀▪▄ ·██· 
  ▐█▌▐▌▐█▌.▐▌▐█▌.▐▌▐█▪·•▐█▌▐▌▐█▄▄▌▪▐█·█▌
  .▀▀▀  ▀█▄▀▪ ▀█▄▀▪.▀   .▀▀▀  ▀▀▀ •▀▀ ▀▀

Choose your destiny:
`)
  setPlopHelpers(plop)

  // plop.setGenerator('model (.net)', dotnetModelFactory(plop))
  // plop.setGenerator('plug-in (.net)', dotnetPluginFactory(plop))
  plop.setGenerator('service (.net)', dotnetServiceFactory(plop))
  // plop.setGenerator('web api (.net)', dotnetWebApiFactory(plop))
  plop.setGenerator('backend', backendFactory(plop))
}
