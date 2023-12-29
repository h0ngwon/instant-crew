import Join from './Join';
import MyPost from './MyPost';
import Profile from './Profile';

const Mypage = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center p-[30px]'>
            <Profile />
            <MyPost />
            <Join />
        </div>
    );
};

export default Mypage;
