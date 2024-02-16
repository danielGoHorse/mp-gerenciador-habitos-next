import Image from 'next/image'

function DayState({day}: {day: boolean | undefined}){

    let image: [string, string, number?] = ["/uncheck.svg", "gray mark", 12];

    if(day === true) image = ["/check.svg", "green mark", 24];
    if(day === false) image = ["/uncheck.svg", "red mark", 12];
    if(day === undefined) image = ["/ellipse.svg", "gray mark", 12];

const[src, alt, size] = image


    return (
        <div className='flex items-center justify-center h-9'>
            <Image
                src={src}
                width={size}
                height={size}
                alt={alt}
              />
        </div>
    )
}

export default DayState;