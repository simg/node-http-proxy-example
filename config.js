module.exports = {
  port:80,
  setuid:'nobody', setgid:'nogroup',
  routes:{
    'dev.holisticsystems.co.uk': {
      //target:'http://dev.holisticsystems.co.uk:8080',
      target:'http://devlaptimer.holisticsystems.co.uk:8080',
      paths:{
        '/blog':{
          target:'http://google.co.uk'
        },
        '/devlaptimer':{
          target:'http://devlaptimer.holisticsystems.co.uk:8080'
        },
        '/3d-experiments':{
          target:'http://dev.experiments.holisticsystems.co.uk:3000/3d-experiments'
        }
      }
    },
    'devlaptimer.holisticsystems.co.uk':{
      target:'http://devlaptimer.holisticsystems.co.uk:8080'
    },  
    //'dev.holisticsystems.co.uk/robot': '127.0.0.1:1337',
    //'dev.holisticsystems.co.uk': '127.0.0.1:3000,
  }
}
