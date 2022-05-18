PGDMP     !                    z         	   db_foramu    14.2    14.2 *    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    16427 	   db_foramu    DATABASE     i   CREATE DATABASE db_foramu WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';
    DROP DATABASE db_foramu;
                postgres    false                        3079    16632 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            1           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    16554    comments    TABLE     �   CREATE TABLE public.comments (
    id_comment integer NOT NULL,
    id_post integer,
    desc_comment text,
    date_comment date DEFAULT CURRENT_DATE,
    user_id uuid
);
    DROP TABLE public.comments;
       public         heap    bob    false            �            1259    16553    comments_id_comment_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_comment_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.comments_id_comment_seq;
       public          bob    false    215            2           0    0    comments_id_comment_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.comments_id_comment_seq OWNED BY public.comments.id_comment;
          public          bob    false    214            �            1259    16529 
   discussion    TABLE     �   CREATE TABLE public.discussion (
    id_post integer NOT NULL,
    id_sub_forum integer,
    title_post text NOT NULL,
    desc_post text,
    date_post date DEFAULT CURRENT_DATE,
    user_id uuid,
    img_post text,
    id_forum integer
);
    DROP TABLE public.discussion;
       public         heap    bob    false            �            1259    16528    discussion_id_post_seq    SEQUENCE     �   CREATE SEQUENCE public.discussion_id_post_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.discussion_id_post_seq;
       public          bob    false    213            3           0    0    discussion_id_post_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.discussion_id_post_seq OWNED BY public.discussion.id_post;
          public          bob    false    212            �            1259    16627    forum_id_forum_seq    SEQUENCE     {   CREATE SEQUENCE public.forum_id_forum_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.forum_id_forum_seq;
       public          postgres    false            �            1259    16437    forum    TABLE     �   CREATE TABLE public.forum (
    id_forum integer DEFAULT nextval('public.forum_id_forum_seq'::regclass) NOT NULL,
    name_forum text NOT NULL,
    desc_forum text NOT NULL,
    date_forum date DEFAULT CURRENT_DATE
);
    DROP TABLE public.forum;
       public         heap    postgres    false    216            �            1259    24811    img    TABLE     L   CREATE TABLE public.img (
    img text NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.img;
       public         heap    postgres    false            �            1259    24818 
   img_id_seq    SEQUENCE     �   CREATE SEQUENCE public.img_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.img_id_seq;
       public          postgres    false    219            4           0    0 
   img_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.img_id_seq OWNED BY public.img.id;
          public          postgres    false    220            �            1259    16442 	   sub_forum    TABLE     �   CREATE TABLE public.sub_forum (
    id_sub_forum integer NOT NULL,
    name_sub_forum text NOT NULL,
    id_forum integer,
    date_sub_forum date DEFAULT CURRENT_DATE NOT NULL,
    desc_sub_forum text NOT NULL
);
    DROP TABLE public.sub_forum;
       public         heap    postgres    false            �            1259    16661    sub_forum_id_sub_forum_seq    SEQUENCE     �   CREATE SEQUENCE public.sub_forum_id_sub_forum_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.sub_forum_id_sub_forum_seq;
       public          postgres    false    211            5           0    0    sub_forum_id_sub_forum_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.sub_forum_id_sub_forum_seq OWNED BY public.sub_forum.id_sub_forum;
          public          postgres    false    217            �            1259    24781    users    TABLE        CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_name character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL,
    user_img text
);
    DROP TABLE public.users;
       public         heap    postgres    false    2            �           2604    16557    comments id_comment    DEFAULT     z   ALTER TABLE ONLY public.comments ALTER COLUMN id_comment SET DEFAULT nextval('public.comments_id_comment_seq'::regclass);
 B   ALTER TABLE public.comments ALTER COLUMN id_comment DROP DEFAULT;
       public          bob    false    214    215    215            �           2604    16532    discussion id_post    DEFAULT     x   ALTER TABLE ONLY public.discussion ALTER COLUMN id_post SET DEFAULT nextval('public.discussion_id_post_seq'::regclass);
 A   ALTER TABLE public.discussion ALTER COLUMN id_post DROP DEFAULT;
       public          bob    false    213    212    213            �           2604    24819    img id    DEFAULT     `   ALTER TABLE ONLY public.img ALTER COLUMN id SET DEFAULT nextval('public.img_id_seq'::regclass);
 5   ALTER TABLE public.img ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    16662    sub_forum id_sub_forum    DEFAULT     �   ALTER TABLE ONLY public.sub_forum ALTER COLUMN id_sub_forum SET DEFAULT nextval('public.sub_forum_id_sub_forum_seq'::regclass);
 E   ALTER TABLE public.sub_forum ALTER COLUMN id_sub_forum DROP DEFAULT;
       public          postgres    false    217    211            %          0    16554    comments 
   TABLE DATA           \   COPY public.comments (id_comment, id_post, desc_comment, date_comment, user_id) FROM stdin;
    public          bob    false    215   �,       #          0    16529 
   discussion 
   TABLE DATA           z   COPY public.discussion (id_post, id_sub_forum, title_post, desc_post, date_post, user_id, img_post, id_forum) FROM stdin;
    public          bob    false    213   �-                  0    16437    forum 
   TABLE DATA           M   COPY public.forum (id_forum, name_forum, desc_forum, date_forum) FROM stdin;
    public          postgres    false    210   �2       )          0    24811    img 
   TABLE DATA           &   COPY public.img (img, id) FROM stdin;
    public          postgres    false    219   L4       !          0    16442 	   sub_forum 
   TABLE DATA           k   COPY public.sub_forum (id_sub_forum, name_sub_forum, id_forum, date_sub_forum, desc_sub_forum) FROM stdin;
    public          postgres    false    211   �4       (          0    24781    users 
   TABLE DATA           X   COPY public.users (user_id, user_name, user_email, user_password, user_img) FROM stdin;
    public          postgres    false    218   8       6           0    0    comments_id_comment_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.comments_id_comment_seq', 35, true);
          public          bob    false    214            7           0    0    discussion_id_post_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.discussion_id_post_seq', 29, true);
          public          bob    false    212            8           0    0    forum_id_forum_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.forum_id_forum_seq', 24, true);
          public          postgres    false    216            9           0    0 
   img_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.img_id_seq', 12, true);
          public          postgres    false    220            :           0    0    sub_forum_id_sub_forum_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.sub_forum_id_sub_forum_seq', 25, true);
          public          postgres    false    217            �           2606    16561    comments comments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id_comment);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            bob    false    215            �           2606    16536    discussion discussion_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.discussion
    ADD CONSTRAINT discussion_pkey PRIMARY KEY (id_post);
 D   ALTER TABLE ONLY public.discussion DROP CONSTRAINT discussion_pkey;
       public            bob    false    213            �           2606    16441    forum forum_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.forum
    ADD CONSTRAINT forum_pkey PRIMARY KEY (id_forum);
 :   ALTER TABLE ONLY public.forum DROP CONSTRAINT forum_pkey;
       public            postgres    false    210            �           2606    24817    img img_pkey 
   CONSTRAINT     K   ALTER TABLE ONLY public.img
    ADD CONSTRAINT img_pkey PRIMARY KEY (img);
 6   ALTER TABLE ONLY public.img DROP CONSTRAINT img_pkey;
       public            postgres    false    219            �           2606    16664    sub_forum sub_forum_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.sub_forum
    ADD CONSTRAINT sub_forum_pkey PRIMARY KEY (id_sub_forum);
 B   ALTER TABLE ONLY public.sub_forum DROP CONSTRAINT sub_forum_pkey;
       public            postgres    false    211            �           2606    24788    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            %   �   x�e��� @g���Eiӱ���te9#Aт�߯Pe�彼�h�^ɓ+Ѐ�Z��Z�#������a�^BrB��ʊ�H��gP:�x��NiV������_�r�!Q�G��Մ-H�?��7�G���P�1�F���;�~�<�En?���/:���l�p4��i���T      #     x��Wɒ�6=C_�<�!����<v9�̌�}ԥIB"Dd��D��<���K�R��r����~��L��)͉��r��':O�:�|o�2jd��V+�lo�����0Ҽ3���S�{�Q��9학��!*s�];�Z�̍�4�w��ˢt��nMa�`H�f�����}��榬S*��_z�#n���)�iHU�^�0p#'7��:ׇf϶�Wn�v+K:P�[Ii������V<�fq�a��/�[�{�(��׍�3o%{�U%y5t��]�*���tv����]<"R�'��PF���
K�^n�g^]��0t9m�[3&~��V�Օ2���,�w{F�\���I�\p�M_��u��f�Ha��5C�H��s�&CLP��z?���P��CiwN9�6�FD�HL8��)N�&5�]�BƛA�w�,�J�:e���+�ԥ�yZ'ĭ-�TBO�_�
��O`��bu4�,�����(&\�S�(��F�,�N�øV�n(h.�B��6�B���	�󮫙2���W^<3�<{�j�����6�C�P#�J�-�l �ߪ�p�/M>T�%F�2���xR���:8������� 7F� �<?^�
���g�(4���m(1�뒧�Jj��=/&��ɉ~�=m�=���YQ*���I��s���yv��ك��='Z<���[��d#q��j�A1.�&4|(P���q��,��vI�d{�)�
��'��!4����5�����>����ݑ?v��\[�ś���e-�c��lV�+��m8ޘ�m w��n,�W��H9�c'���oF��+(`~��J>q٨��$�d�/-��୳��Ǉj��SO�S�����%�d�=��q�8��y����d��WH���u��A;��-��eu�WC�e[�w,'�MgPܮR#!QB'��<�k�����t���&��]���B���Q?�S����C�;X���(+�c_n�Ϳԋ�^�8a�.0�=`�:Q����X�Vv�J�0˕\�U6WQV#W/^�����E�"��X@b�� �T@��5G��Aw�#��~Aߕ:��
���q߿~�Ic���v�M���i'�&2Fы��?=ٜ$R$��2o��ek��ֱ�:�w��e*v��9��͉�b<��mM"2v�+L)��nUo�����
b��ߛ���֒C!�V�����0�L�M�Ku5�`�C���{Qc������ubO��L���S#���TF�4]���8T�ΠE5vM:�u�*�y�U1���-M:����-O��z�Z�S$I          ]  x�]�MN�0���)|��jC�.�6H��8�&��"�����6V�<3߼��x�Q�c�H�L��^|���(�)��K��Jr� �v�+Q��z�n����ŝ#����1��AB���"�H>ɑt4�J�r�7���x(�	C#$�Xoi�#;�M�kyfqQW6r�F���!�૕۪������l!�>�Q��!&.vd!P�p�6��ˮ�r0>)0fNhĖ��Do඀{PWX�U* ���}�8gx�d_��K0��~94��8!��!m�q��9���v���0 ��EC���+�3w���m�V7���[�#KN� 7�-��cUU����N      )   �   x���A� еܥ���g��'{���ͬ�e&�Z!�]�t�e��Y9/������z���?e���rj�FO�6sߜهu�� �͕��\Jm�4ۯ?���5������K!{r����Q�      !     x��Tێ�0}v�b>�[����+�P	^�x�&���؉l�ϱ���� �Ǟ�3����պɹV�j1[,�f7W�[��iǥfK���i�I{m�/N����&/��Ib�y¹ӏ"b*x�ݨ�6��tc��"��Џ"�-,��5%����95�Ro�:� �=t�X��E�K[�g�Gؚ�E+m�!�s���FJ�f����';�D|�ScAL�!�L(;޳Ǧ���IUc�!nr�\j v����ʱ�4�[*R�i�R��k�<A?S�@�m���1��%C��tڟ���&�)h\�d�~�=S_����K���WǗ��p\k\�%�V���N�g��8��C<�j��i�<j�C|�M�X5?��J�Q�J6Laa�D�=�4 �^�t5p|�d��Lm:�+�8G8z��z�"���rEE4��m���W�Vyqi��j����Bm�����R�-�\�W������b(.�6k����*]�������dJ}�v6�[v9{]l
���5i�Ӟ�ʅ���k�2�N��{�x�����0��u�R���y�=T�Pߢ����l!>�����x��A\��Tk]vB���:���H��T4�1��݌Y�c�a��yӳ�Z+�u����v���^��vpw/W�h�-�xT���a2\���l��Zr����栃T��2�i$�'qf!F-û�ފ�{��Q�6���δ�'��{�/���F���iD�y�^�����u�$�~�t½Vi�>|�Ku�4!gӪ�S��2��Z�M!XgߧY���L;x      (   �  x��VɎ�8<��bu�>Hw�O�%�����n��M�%y����U���)~�'"�^�E�P�\Z��P��|$�U:�X+���[��V;�l���P}����j�ir^�oI��N�v�����g�h��G�3�>���x��!��2�1��Tq_Q�|�"�C�C�OI�IW^�w�{���?����,�(��l|��Fs�)��Y^�w�����L�%V8L�}lh�KA_@ ,e�Z����=>������>:�n�/l<=!��R��7���/�:T�{;hw�x�2 ���[
�.ͭ/�}h�X$a��%FzƕW`^������YT��T���}�Vϫqn�S�mN�EeT��jv>��+��<�13�
C}�)w�5��1�>�D"4!�����H/{���n�/����d:�u7-N�q�y�.�K��1���O��}�O�f�?��E�����7j����B�d(B���j�Xϸ�
\[-޳�{�t|�b�o���"�/�ø�h�1='|6�f�� �
PA�+��2>W:�4�`H�b��m�?�+pa�?��$�����y0�:�"�],SM�f��E��)�M���w:ʧ�����#��Pڗ&�є��K�I�ݕ���f�y>�����l���^�=Oy[�/��w�Ƥg��۸�&��}6��,T>bB9�wg	�oE�$%"r��	
 �y���z{�ح�ŕ����ϋ�1;������������_�2��ot}���&,�h"�C0|�=dn�¡�!�'3sy�/f�Ԋx�Z�Ci�;�����Q�˖����mSy9��?F� :��RR%��h1�c�`�wyHDB�@��?��z�qN�j�b�vҜ̬���IpY��2��`n0��Z|\�r���M��msm��ҏ��}lw���w�H�(��y\:z�W�Q�:��l�{�ލV�G�q,���JZ��ݤ�Ѳ>��Z��K����DL���O	s-��c�9
ܽ.�T�ޛ��<I=�y�³cy���d.�[�ܽ7�E5��H�ݚ��L/��4oի�����+I>3��
��0�u�X�N��t�L�URu�+���t�p��Z6�5�)�ڋ3cy����x�D�	%��#ȶ:�^��?K�m��6N��O��T��4%y��<��H)w�1�6�����35gs0_�|dcVJ��q��b+�_l�Z0�����U_����oY?f�<�4�R_q6���5�[�Qo�X���r$�"zX�{��_j�}mH���8��wH?�/f[����Gv~��f�M_��R9@�ټ���Y�Gڻt��q��,q�{��O�?�R�]'�d!B[��P=.Ҏ,��l�\:���+�$���+�uw�<QYL[�6��l_�6��&�Ͷ,3�`l·Yz��N�t�-=�������9dH��+�AܷH�|�? �Oq�����e��ܻ��/�;jl�=כ�X�a��F�~���l]|\O� ��� ����6h����%?��B�䫐zd5�Vp|�����l�,j��^zN��+�|�����%�e��ʨ]s�:`	2��.]�Z/��V�TJ����Nn��JN�L��ҧt���V����
}tiGF�`M��^�v�_���%�h>;7�������iQ�ޯ�f��kx\�T����r��צ�]4ۿ�Y����-�?��B�^�]HRNK,�G�y�S�V�S������Oγze�~���b���/P�JZ����
���(���I�*�!>G��@�k�;��O�#����!n���3U�m����k(���%�P?}N������\6�tx�G��:�ä�;�D�������W����ڢ�{�[�[(������q���ɚ�=jb}��#�Z철sm��rI��ڻ�����Fwg�KZ��>��T�
��∛E�ܚ�� ��[���W���:�O�.z���t�
�}��7	��w     