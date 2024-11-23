import isUrl from "is-url"
import { IPagination } from "../components/common/types"
import { supabase } from "../supabase"
// @ts-ignore
import base62 from 'base62/lib/ascii';
import { IVisit } from "../components/Table/Table.types";

export const getAllUrls = async ({ pageSize, pageNumber }: IPagination) => {
  const from = pageNumber * pageSize 
  try {
    const { data, error, count } = await supabase
      .from('urls')
      .select('*', { count: 'exact'})
      .range(from, from + pageSize - 1)
      .order('createdAt', { ascending: false })
      .select('*, visits:visits(*)');


    if (error) throw error
    return { data, count}
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getShortUrl = async (longUrl: string) => {
  if (!longUrl.includes('http://') && !longUrl.includes('https://')) {
    longUrl = 'http://' + longUrl;
  }
  if (!isUrl(longUrl)) return 'Should be provided a valid URL'

  try {
    const { data, error: urlsError } = await supabase
      .from('urls')
      .select()
      .eq('longUrl', longUrl);
    if (urlsError) throw urlsError;
    if (data.length) return data
    
    const { count, error } = await supabase.from('urls').select('*', { count: 'exact'})
    if (error) throw error;
    
    const hash = base62.encode(count);
    const shortUrl = `${new URL(window.location.origin).host}/${hash}`;
    const { data: url, error: insertError } = await supabase
    .from('urls')
    .insert({ hash, longUrl, shortUrl })
    .single();
    
    if (insertError) throw insertError;
    return url;
  } catch (error) {
    console.log(error);
    return 'Could not save the URL';
  }
};

export const getUrl = async (hash: string) => {
  try {
    const { data, error: urlsError } = await supabase
      .from('urls')
      .select()
      .eq('hash', hash);
    if (urlsError) throw urlsError;
    if (data) return data[0];
  } catch (error) {
    console.log(error);
    return 'Could not get the URL';
  }
};

export const getUserIp = async () => {
  try {
    return await fetch('https://api.ipify.org').then(response => response.text())
  } catch (error) {
    console.log(error);
    return 'Could not get User IP, reload the page';
  }
};

export const getCountryCode = async () => {
  try {
    return new Promise((resolve, reject) => {
      try {

        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          const res = await fetch(`https://ipapi.co/json/?lat=${lat}&lon=${lon}`)
          .then((response) => response.json())
          .then((data) => data.country_code)
          resolve(res)
        });

      } catch (e) {
        console.log(e)
        reject()
      }
    })
  } catch (error) {
    console.log(error);
    return 'Could not get User IP, reload the page';
  }
};

export const createVisit = async (visitDto: IVisit) => {
  try {
    const { data, error } = await supabase
      .from("visits")
      .insert(visitDto);
    if (error) return error
    return data
  } catch (error) {
    console.error('Error creating visit:', error);
    return error
  }
};
