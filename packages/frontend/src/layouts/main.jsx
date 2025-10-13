import { Header } from "../components/Header";

export default function Main(props) {
  return (
    <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_45%),_radial-gradient(circle_at_bottom,_rgba(124,58,237,0.2),_transparent_40%)]"
      />

      <div class="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-6 lg:px-10 lg:py-10">
        <Header />
        <main class="mt-10 flex-1 pb-16">{props.children}</main>
      </div>
    </div>
  );
}
