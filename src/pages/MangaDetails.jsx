import { useParams } from 'react-router-dom';
import ChapterList from '../components/manga/ChapterList';
import { FiArrowRight } from 'react-icons/fi';
import Topbar from '../components/layout/Topbar';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
function MangaDetails() {
  const { comicId } = useParams();
  console.log(comicId);
  const { data: details } = useQuery({
    queryKey: [`${comicId}-metadata`],
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000 * 24,
    queryFn: async () => await axios.get(`/manga/${comicId}`).then((res) => res.data)
  });

  const [readMore, setReadmore] = useState(false);
  return (
    <>
      <Topbar></Topbar>
      <div className="mx-10 mb-10 flex flex-col">
        <div className="my-5 flex gap-5">
          <div>
            {details && details.cover.url ? (
              <img src={details.cover.url} alt="" className="min-w-48 max-w-48 rounded-md" />
            ) : (
              <Skeleton width={192} height={275} />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-bold uppercase tracking-widest text-neutral-500">
              {details && details.status ? (
                details.status
              ) : (
                <Skeleton count={1} width={100} height={20} />
              )}
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex max-w-screen-sm flex-col gap-1">
                <span className="text-3xl font-bold">
                  {details && details.title ? (
                    details.title
                  ) : (
                    <Skeleton count={1} width={300} height={20} />
                  )}
                </span>
                {/* <span className=" max-h-20 overflow-auto pb-2">
                  {(details &&
                    details.altNames &&
                    details.altNames.map((name, index) => (
                      <span key={index} className="text-sm text-neutral-400 ">
                        {name + (details.altNames.length > 0 ? ', ' : '')}
                      </span>
                    ))) || <Skeleton count={1} width={200} height={20} />}
                </span> */}

                {/* router.get("/", getRoot);
router.get("/search", getSearch);
router.get("/chapters/:mangaID", getChapters);
router.get("/manga/:mangaID", getMetadata);
router.get("/read/:chapterID", getPages); */}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  {(details && Object.keys(details).length !== 0 && (
                    // <Link to={`/read/${comicId}/chapter-1`}>
                    <button className="flex items-center gap-2 rounded-md bg-neutral-100 p-2 text-lg font-bold uppercase text-neutral-950">
                      Start Reading <FiArrowRight />
                    </button>
                    // </Link>
                  )) || <Skeleton height={40} width={200} />}
                </div>
                <div>
                  <span className="font-semibold capitalize text-neutral-300">
                    {(details && details.type) || <Skeleton count={1} width={100} height={20} />}
                  </span>
                </div>
                <div className="flex max-w-screen-sm flex-col items-start">
                  <p
                    className={` ${readMore ? 'line-clamp-none' : 'line-clamp-3'} text-neutral-400`}
                  >
                    {(details && details.synopsis) || (
                      <Skeleton count={5} width={640} height={20} />
                    )}
                  </p>
                  {details?.synopsis && (
                    <button
                      onClick={() => setReadmore((readMore) => !readMore)}
                      className="flex items-center justify-center gap-1  p-1 text-sm font-semibold text-neutral-200 underline"
                    >
                      <span>Read more</span>
                      {!readMore ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 mt-5 flex h-max flex-col gap-1 rounded-md border border-neutral-700 bg-neutral-950 p-4">
            <span>
              Author:
              <span className="">
                {(details && details.author) || <Skeleton count={1} width={200} height={20} />}
              </span>
            </span>
            <span>
              Published:
              <span className="">
                {(details && details.createdAt) || <Skeleton count={1} width={200} height={20} />}
              </span>
            </span>
            <span>
              Genres:
              <span className="">
                {(details && details.genres && details.genres.join(', ')) || (
                  <Skeleton count={1} width={200} height={20} />
                )}
              </span>
            </span>
            <span>
              Mangazines:
              <span className="">
                {(details && details.mangazines) || <Skeleton count={1} width={200} height={20} />}
              </span>
            </span>
          </div>
        </div>
        {details && <ChapterList comicId={comicId} />}
      </div>
    </>
  );
}

export default MangaDetails;
