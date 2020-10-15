export default async function request(url, datas) {
    const res = await fetch(
      `https://www.fastmock.site/mock/2c5613db3f13a5c02f552c9bb7e6620b/f5${url}`,
      datas
    );
    if (res && res.status === 200) {
      const data = await res.json();
      return data && data.isSuccess && data.data;
    }
    return null;
  }
  