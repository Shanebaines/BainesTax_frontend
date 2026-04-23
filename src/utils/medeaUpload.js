import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://siwcehebetoocvtpcbqf.supabase.co'
const SUPABASE_ANON_KEY =
	import.meta.env.VITE_SUPABASE_ANON_KEY ||
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpd2NlaGViZXRvb2N2dHBjYnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MTM5MTcsImV4cCI6MjA5MjQ4OTkxN30.q2p2c0ec7mxyy-xguyDdrp7xjYF1JwsdIH5WWiKqJVs'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png']

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function getFileExtension(file) {
	if (file.type === 'image/png') {
		return 'png'
	}

	return 'jpg'
}

function buildUniqueFileName(file, folder = 'products') {
	const uniqueId =
		typeof crypto !== 'undefined' && crypto.randomUUID
			? crypto.randomUUID()
			: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

	const ext = getFileExtension(file)
	return `${folder}/${Date.now()}-${uniqueId}.${ext}`
}

export function uploadMedeaToSupabase(file, options = {}) {
	return new Promise(async (resolve, reject) => {
		try {
			if (!(file instanceof File)) {
				reject(new Error('A valid file is required for upload.'))
				return
			}

			if (!ALLOWED_MIME_TYPES.includes(file.type)) {
				reject(new Error('Only .jpg and .png files are allowed.'))
				return
			}

			const path = buildUniqueFileName(file, options.folder || 'products')

			const { error: uploadError } = await supabase.storage.from('images').upload(path, file, {
				cacheControl: '3600',
				upsert: false,
				contentType: file.type,
			})

			if (uploadError) {
				reject(uploadError)
				return
			}

			const { data } = supabase.storage.from('images').getPublicUrl(path)

			if (!data?.publicUrl) {
				reject(new Error('Unable to generate a public URL for the uploaded media.'))
				return
			}

			resolve({
				publicUrl: data.publicUrl,
				path,
				fileName: path.split('/').pop() || path,
			})
		} catch (error) {
			reject(error)
		}
	})
}
