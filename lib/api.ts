const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL non è definito nel file .env.local');
}


export async function getMenus() {

    const url = `${API_BASE_URL}/api/menus`;

    const response = await fetch(url, {
        cache: 'no-store', 
    });

    if (!response.ok) {
        throw new Error(`Error fetching menus: ${response.statusText}`);
    }

    const data = await response.json();

    return data.data; 
}

export async function getPageBySlug(slug: string) {
    
    if (!slug) {
        throw new Error("Slug not supplied to getPageBySlug");
    }

    const url = `${API_BASE_URL}/api/pages/${slug}`;

    const response = await fetch(url, {
        cache: 'no-store', 
    });

    if (!response.ok) {
        return null; 
    }

    const data = await response.json();
    
    return data.data || data; 
}
