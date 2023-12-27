export interface IGeolocation {
    center: {
        lat: number;
        lng: number;
    };
    errMsg: string | null;
    isLoading: boolean;
}

interface IGeolocationArg {
    setState: (value: React.SetStateAction<IGeolocation>) => void;
}

const options = {
    enableHighAccuracy: true,
};

export async function geolocation({ setState }: IGeolocationArg) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState((prev) => ({
                    ...prev,
                    center: {
                        lat: position.coords.latitude, // 위도
                        lng: position.coords.longitude, // 경도
                    },
                    isLoading: false,
                }));
            },
            (err) => {
                setState((prev) => ({
                    ...prev,
                    errMsg: err.message,
                    isLoading: false,
                }));
            },
            options,
        );
    } else {
        setState((prev) => ({
            ...prev,
            errMsg: 'geolocation을 사용할수 없어요..',
            isLoading: false,
        }));
    }
}
