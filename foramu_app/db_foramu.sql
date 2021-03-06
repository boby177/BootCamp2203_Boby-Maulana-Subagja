PGDMP                         z         	   db_foramu    14.2    14.2 &               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16427 	   db_foramu    DATABASE     i   CREATE DATABASE db_foramu WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';
    DROP DATABASE db_foramu;
                bob    false            ?            1259    16554    comments    TABLE     ?   CREATE TABLE public.comments (
    id_comment integer NOT NULL,
    id_user integer,
    id_post integer,
    desc_comment text,
    date_comment timestamp with time zone
);
    DROP TABLE public.comments;
       public         heap    bob    false            ?            1259    16553    comments_id_comment_seq    SEQUENCE     ?   CREATE SEQUENCE public.comments_id_comment_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.comments_id_comment_seq;
       public          bob    false    216                       0    0    comments_id_comment_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.comments_id_comment_seq OWNED BY public.comments.id_comment;
          public          bob    false    215            ?            1259    16529 
   discussion    TABLE     ?   CREATE TABLE public.discussion (
    id_post integer NOT NULL,
    id_user integer,
    id_forum integer,
    id_sub_forum integer,
    title_post character(50) NOT NULL,
    desc_post text,
    date_post timestamp with time zone
);
    DROP TABLE public.discussion;
       public         heap    bob    false            ?            1259    16528    discussion_id_post_seq    SEQUENCE     ?   CREATE SEQUENCE public.discussion_id_post_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.discussion_id_post_seq;
       public          bob    false    214                       0    0    discussion_id_post_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.discussion_id_post_seq OWNED BY public.discussion.id_post;
          public          bob    false    213            ?            1259    16437    forum    TABLE     ?   CREATE TABLE public.forum (
    id_forum integer NOT NULL,
    name_forum character(15) NOT NULL,
    desc_forum text,
    date_forum timestamp without time zone
);
    DROP TABLE public.forum;
       public         heap    bob    false            ?            1259    16442 	   sub_forum    TABLE     ?   CREATE TABLE public.sub_forum (
    id_sub_forum integer NOT NULL,
    name_sub_forum character(50) NOT NULL,
    id_forum integer NOT NULL,
    date_sub_forum timestamp without time zone NOT NULL,
    desc_sub_forum text NOT NULL
);
    DROP TABLE public.sub_forum;
       public         heap    bob    false            ?            1259    16429    users    TABLE     ?   CREATE TABLE public.users (
    id_user bigint NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    bob    false            ?            1259    16428    users_id_user_seq    SEQUENCE     z   CREATE SEQUENCE public.users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_id_user_seq;
       public          bob    false    210                       0    0    users_id_user_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;
          public          bob    false    209            p           2604    16557    comments id_comment    DEFAULT     z   ALTER TABLE ONLY public.comments ALTER COLUMN id_comment SET DEFAULT nextval('public.comments_id_comment_seq'::regclass);
 B   ALTER TABLE public.comments ALTER COLUMN id_comment DROP DEFAULT;
       public          bob    false    216    215    216            o           2604    16532    discussion id_post    DEFAULT     x   ALTER TABLE ONLY public.discussion ALTER COLUMN id_post SET DEFAULT nextval('public.discussion_id_post_seq'::regclass);
 A   ALTER TABLE public.discussion ALTER COLUMN id_post DROP DEFAULT;
       public          bob    false    214    213    214            n           2604    16432    users id_user    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN id_user DROP DEFAULT;
       public          bob    false    210    209    210                      0    16554    comments 
   TABLE DATA           \   COPY public.comments (id_comment, id_user, id_post, desc_comment, date_comment) FROM stdin;
    public          bob    false    216   ?*                 0    16529 
   discussion 
   TABLE DATA           p   COPY public.discussion (id_post, id_user, id_forum, id_sub_forum, title_post, desc_post, date_post) FROM stdin;
    public          bob    false    214   ?+                 0    16437    forum 
   TABLE DATA           M   COPY public.forum (id_forum, name_forum, desc_forum, date_forum) FROM stdin;
    public          bob    false    211   ?,                 0    16442 	   sub_forum 
   TABLE DATA           k   COPY public.sub_forum (id_sub_forum, name_sub_forum, id_forum, date_sub_forum, desc_sub_forum) FROM stdin;
    public          bob    false    212   .                 0    16429    users 
   TABLE DATA           ?   COPY public.users (id_user, name, email, password) FROM stdin;
    public          bob    false    210   u0                  0    0    comments_id_comment_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.comments_id_comment_seq', 7, true);
          public          bob    false    215                        0    0    discussion_id_post_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.discussion_id_post_seq', 1, false);
          public          bob    false    213            !           0    0    users_id_user_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_id_user_seq', 5, true);
          public          bob    false    209            |           2606    16561    comments comments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id_comment);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            bob    false    216            z           2606    16536    discussion discussion_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.discussion
    ADD CONSTRAINT discussion_pkey PRIMARY KEY (id_post);
 D   ALTER TABLE ONLY public.discussion DROP CONSTRAINT discussion_pkey;
       public            bob    false    214            v           2606    16441    forum forum_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.forum
    ADD CONSTRAINT forum_pkey PRIMARY KEY (id_forum);
 :   ALTER TABLE ONLY public.forum DROP CONSTRAINT forum_pkey;
       public            bob    false    211            x           2606    16446    sub_forum sub_forum_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.sub_forum
    ADD CONSTRAINT sub_forum_pkey PRIMARY KEY (id_sub_forum);
 B   ALTER TABLE ONLY public.sub_forum DROP CONSTRAINT sub_forum_pkey;
       public            bob    false    212            r           2606    16436    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            bob    false    210            t           2606    16434    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            bob    false    210                       2606    16542    discussion forum    FK CONSTRAINT     v   ALTER TABLE ONLY public.discussion
    ADD CONSTRAINT forum FOREIGN KEY (id_forum) REFERENCES public.forum(id_forum);
 :   ALTER TABLE ONLY public.discussion DROP CONSTRAINT forum;
       public          bob    false    211    214    3190            }           2606    16469    sub_forum forum_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.sub_forum
    ADD CONSTRAINT forum_id FOREIGN KEY (id_forum) REFERENCES public.forum(id_forum) NOT VALID;
 <   ALTER TABLE ONLY public.sub_forum DROP CONSTRAINT forum_id;
       public          bob    false    3190    212    211            ?           2606    16567    comments post    FK CONSTRAINT     v   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT post FOREIGN KEY (id_post) REFERENCES public.discussion(id_post);
 7   ALTER TABLE ONLY public.comments DROP CONSTRAINT post;
       public          bob    false    216    214    3194            ?           2606    16547    discussion sub_forum    FK CONSTRAINT     ?   ALTER TABLE ONLY public.discussion
    ADD CONSTRAINT sub_forum FOREIGN KEY (id_sub_forum) REFERENCES public.sub_forum(id_sub_forum);
 >   ALTER TABLE ONLY public.discussion DROP CONSTRAINT sub_forum;
       public          bob    false    3192    214    212            ~           2606    16537    discussion user    FK CONSTRAINT     u   ALTER TABLE ONLY public.discussion
    ADD CONSTRAINT "user" FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 ;   ALTER TABLE ONLY public.discussion DROP CONSTRAINT "user";
       public          bob    false    3188    214    210            ?           2606    16562    comments user    FK CONSTRAINT     s   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "user" FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 9   ALTER TABLE ONLY public.comments DROP CONSTRAINT "user";
       public          bob    false    3188    210    216               ?   x?????0??3<?܍?mX??^??\&:)e?
?^ĺ\Ц??$??7
????\ 8?^#?z|μ??N??Rk?e
Rdj?	?i{?@5???A?&?5v?P?;úB?#Ƒ/??4?	????2??4*??YD?nFS?? 
?r$??8Wz?7;Rz'}?vx?g?:??A?д`?8u???u?????d??z?	??HRn?         Q  x???MO?@???W?'/?i?x?b$~D?z`X???????,6!$??f?i'?<?l??d??6?hV??9.0cZ?t??ɞ$??	T?ł+ڒ??Y+??{Z6?G??||UL????2?F????N??e8?%????)?<????tm k("?ou+?94?;j???????l?F,^j??χn<?m??|?aZ??cL??_̷?t??PG?8?$Oed??ب?q??H??#????&?[E?k?xCx??x	?M?l??? ?} ?	Y8r?S??*Ѥ??:yB?i8$˥?n???ػ???%?َ??ڈ??8:?-????ƚv?W?T?[????_a??????2           x?m??N?0???S??ԕ$.??Ɖ??k?YI?*IA{{????DU)??????NG?>??G6p??Kp-|:j8?!2????}?D=?utC\????U?]m?T??_T?ɱt̀???yvc?戉"/;&?G???????ܪw??? ??$?HT?VYo`?;vRsH???E"o!?^??u?$?? i22x??n^c?>??????)??9I&m?g?(?a?b?g???4W?w3f'7?????7??^?D?[<fP?z?1g?G?IL^????????ZE?l1?$         K  x????n?0Ư?S?HQB???MU??V?U?vUi7'????m6??wlCH???j	!?????;gžqek??^vX8??c+?-??d?>Y]?ry???6({??jPA??}V(?p???[???p????h ?PaQ?G[??? \
??d?Iq?/?ڈ?M?????Cˉ?M??W]?*J?H?5?[T?
Z??W?g?5A???¢?O?S??lg??ӣĹ??`%Py?^?:?rkÍ'iu??[??tZ7????ٽr?(tB???? <,???/w?g,7???[>??????AnbZ??8?Y?S[?t?w?s?b=j?mirξ?)??????Aކ????N?;?6X#?W????5Z7?=?Jdi#tE0m#)???Zir???????lB??????=?Ѫ?n}?VPK???v?|A@A??! ?4?d?)n>O??_"zb3`-???xhm?=K?E??7I????*??N?/??s??Qk5?tu?4煠?4zhDՃ????B^?j1vX????K-aٞ?B???챷4^?t??Q?]????(Y?\a?o??<Zsw??aŬ?K?_i?$,{ɘ           x?eαv?0 ??9y?D6? j+bKQs??@%??է??Ԟ.???sm0>?-`F??	???;?X?N,*?W??}o?O"??5f%???d?n?5????Z?J?=0?y?.??̈?in???o???E??z?????%-	?ݛn???3i????܎?%t????@???M2??V?Њ???R?4?
͟9s???Mv a??y&A!i?t????((???]?޽?r9F???t2/?r?Yr?hc_*??u???^??s?g+????#??i?     