# Invoice Management System

## Description

Invoice Management System adalah sebuah aplikasi untuk melihat, membuat, dan mencetak invoice belanja. Aplikasi ini dibuat secara full-stack dengan framework Next.js.

## Daftar Isi
* [Technology Stack](#technology-stack)
* [Design Patterns](#design-patterns)
* [Requirements](#requirements)
* [Setup](#setup)
* [Created By](#created-by)

## Technology Stack
* Next.js v14
* React v19
* Drizzle ORM v0.38
* TailwindCSS, Zod, Shadcn, and more!

## Challenges
1. Form dengan server actions

Karena saya lumayan lama tidak menggunakan Nextjs dalam development saya baru kali ini mencoba membuat form dengan RSC. Hal ini terjadi saat mengimplementasikan page Create Invoice. Awalnya, percobaannya gagal karena error Form pada client component dalam memanggil sebuah server action. Setelah ditulis kembali dan merefactor beberapa hal, akhirnya fungsionalitas tersebut berhasil bekerja.

2. Toast yang tidak bekerja

Toast yang digunakan dalam boilerplate ada komponen Toast dari Shadcn, tetapi entah kenapa toast tidak dapat dipanggil di dalam pages-pages saya. Sampai sekarang pages juga belum mencetak toast ke layar.

3. Batasan waktu

Karena kerugian waktu akibat error form di atas, banyak validasi yang harus di-skip karena keterbatasan waktu :(.


## Setup  

Sebelum menjalankan aplikasi, anda harus mempersiapkan database dan _environment variables_ terlebih dahulu. Pastikan juga anda memiliki Node terinstall pada perangkat.

1. Siapkan database Postgresql yang dapat diakses
2. Duplikat `.env.example` kemudian rename menjadi `.env`
3. Masukkan _connection string_ postgre ke dalam `.env`

Setelah database berhasil disambungkan, lakukan migrasi tabel-tabel yang akan digunakan. Sebelumnya, lakukan instalasi seluruh _package_ aplikasi.

4. Lakukan `git clone https://github.com/fawwazabrials/fungsitama-intv-test.git`
5. Masuk ke dalam direktori dengan `cd fungsitama-intv-test`
6. Jalankan `npm i` atau `pnpm i`
7. Setelah selesai, jalankan `npx drizzle-kit migrate` untuk migrasi _database_

Baru anda dapat menjalankan aplikasi dengan perintah `npm run dev`!

## Created by
Fawwaz Abrial Saffa