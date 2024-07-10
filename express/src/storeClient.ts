import * as Minio from 'minio'


const storeClient= new Minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    accessKey: "76741yNVyrKihDSfCuIJ",
    secretKey: "pek2quhBBHunJPfHXrGp54eslrqL51HfzF2Fzr40",
    useSSL: true
})


export const copyObjectFolder= async (srcPrefix: string, dest: string) => {
    try {
        const buckets= await storeClient.listBuckets()
        // console.log(buckets)

        const objectsStream= await storeClient.listObjectsV2(`${process.env.STORE_BUCKET}`, srcPrefix, true)
        const objects: Minio.BucketItem[] = []
        await new Promise( (resolve, reject) => {
            objectsStream.on('data', (obj) => {
                objects.push(obj)
            })

            objectsStream.on('end', resolve)
        } )
        
        // console.log(objects)

        await Promise.all( objects.map( async (obj) => {
            const destination= obj.name?.replace(srcPrefix, dest)
            await storeClient.copyObject(`${process.env.STORE_BUCKET}`, destination!, `/${process.env.STORE_BUCKET}/${obj.name}`)
        } ) )
    }
    catch (error) {
        console.error("Error in copyObjectFolder fxn", error)
    }
}