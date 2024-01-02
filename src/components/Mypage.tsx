import Join from './Join';
import MyPost from './MyPost';
import Profile from './Profile';
import ProfileModifyButton from './ProfileModifyButton';
import ProfileModify from './ProfileModifyButton';

const Mypage = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center p-[30px]'>
            <Profile />
            <ProfileModifyButton/>
            <MyPost />
            <Join />
        </div>
    );
};

export default Mypage;
