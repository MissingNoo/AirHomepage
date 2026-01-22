export interface Props {
  image?: string;
  text?: string;
  subtext?: string;
  link?: string;
}

export function Card(props: Props) {
  return (
    <div className="m-2 card bg-base-300 shadow-sm flex max-h-100 max-w-80">
      <figure>
        <img class="p-2 object-contain rounded-4xl" src={props.image} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.text}</h2>
        <p>{props.subtext}</p>
        <div className="card-actions justify-end">
          <a class="btn" href={props.link} f-partial={props.link}>Visit</a>
        </div>
      </div>
    </div>
  );
}
