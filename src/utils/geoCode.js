const request = require('request')

const geoCode = (adress,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token="get your token access from mapbox.com app'
    request({url:url,json:true},(error,response)=>{
        if(error){
        callback('unable to conect to locations service',undefined)
        } else if(response.body.features.length===0){
        callback('unable to find location.try another search',undefined)
        }else{
        callback(undefined,{
            latitud:response.body.features[0].center[1],
            longitud:response.body.features[0].center[0],
            location:response.body.features[0].place_name

        })
        }
    })
}
module.exports=geoCode
