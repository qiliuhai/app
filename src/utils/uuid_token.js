import { v4 as uuidV4 } from 'uuid'
export const getUUID = () => {
    // uuid应该是唯一的而不是每次都调函数新生成，只生成一次
    // 如果本地存储里有就取本地的没有再生成,并存储到本地
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (uuid_token) {
        return uuid_token
    } else {
        uuid_token = uuidV4()
        localStorage.setItem('UUIDTOKEN', JSON.stringify(uuid_token))
        return uuid_token
    }
}



