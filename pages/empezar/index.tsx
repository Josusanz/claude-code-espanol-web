import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function EmpezarIndex() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/empezar/introduccion')
  }, [router])
  return null
}
