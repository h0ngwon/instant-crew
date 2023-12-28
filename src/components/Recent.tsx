import Image from 'next/image';

const Recent = () => {
    return (
        <section id='recent' className='h-[50vh]'>
            <div className='p-[30px]'>
                <h1 className='text-[30px] font-bold'>최신 게시글</h1>
                <div className='w-[100%] h-[100%]'>
                    <ul className='flex justify-around items-center'>
                        <li className='min-w-[200px] relative flex justify-center'>
                            <div className='relative inline-block overflow-hidden'>
                                <div className='absolute inset-0 bg-gradient-image'></div>
                                <Image
                                    src={'/img/recent.avif'}
                                    width={300}
                                    height={100}
                                    alt='r'
                                />
                            </div>
                            <div className='absolute bottom-0 text-white font-bold text-[25px] p-[10px]'>
                                <p>마포구 잔치국수</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Recent;
