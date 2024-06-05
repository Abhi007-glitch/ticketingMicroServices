import "bootstrap/dist/css/bootstrap.css"

export default ({Component,pageProps})=>{ // this Component work encapulation/enclosing component for all the so anything applied over here or imported here get's applicable to all the component of the app
  return <Component {...pageProps} />
}