export const fetcher = async (roomId: string) => {
    const res = await fetch(`/api/messages/${roomId}`);
    const data = await res.json();
    return data;



}