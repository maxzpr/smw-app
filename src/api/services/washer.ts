import { $axios } from "../axios";

export default {
  update(data: { id: string, name?: string, coin?: number, status: string, processTime?: number }) {
    return $axios.patch('/api/washer', data)
  }
}