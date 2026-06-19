-- ============================================================================
-- Daily scripture seed — 40 public-domain (KJV) verses, one per day starting
-- today. Run once in the SQL Editor, after schema.sql. Safe to re-run: rows
-- are keyed by feature_date (unique), so existing dates are left untouched.
--
-- Add your own / longer-running set later by inserting more rows with later
-- feature_date values, or by swapping translations for ones you have rights
-- to quote at scale.
-- ============================================================================
insert into scriptures (reference, text, translation, feature_date) values
  ('Isaiah 40:31', 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', 'KJV', current_date + 0),
  ('Philippians 4:13', 'I can do all things through Christ which strengtheneth me.', 'KJV', current_date + 1),
  ('Joshua 1:9', 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', 'KJV', current_date + 2),
  ('Psalm 46:1', 'God is our refuge and strength, a very present help in trouble.', 'KJV', current_date + 3),
  ('Proverbs 3:5-6', 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', 'KJV', current_date + 4),
  ('Romans 8:28', 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', 'KJV', current_date + 5),
  ('Psalm 23:1', 'The LORD is my shepherd; I shall not want.', 'KJV', current_date + 6),
  ('Matthew 11:28', 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', 'KJV', current_date + 7),
  ('Psalm 121:1-2', 'I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.', 'KJV', current_date + 8),
  ('Galatians 6:9', 'And let us not be weary in well doing: for in due season we shall reap, if we faint not.', 'KJV', current_date + 9),
  ('Hebrews 12:1', 'Let us run with patience the race that is set before us.', 'KJV', current_date + 10),
  ('1 Timothy 4:8', 'For bodily exercise profiteth little: but godliness is profitable unto all things, having promise of the life that now is, and of that which is to come.', 'KJV', current_date + 11),
  ('Psalm 73:26', 'My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever.', 'KJV', current_date + 12),
  ('2 Corinthians 12:9', 'My grace is sufficient for thee: for my strength is made perfect in weakness.', 'KJV', current_date + 13),
  ('Psalm 27:1', 'The LORD is my light and my salvation; whom shall I fear? The LORD is the strength of my life; of whom shall I be afraid?', 'KJV', current_date + 14),
  ('Jeremiah 29:11', 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.', 'KJV', current_date + 15),
  ('Psalm 34:18', 'The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.', 'KJV', current_date + 16),
  ('James 1:2-3', 'My brethren, count it all joy when ye fall into divers temptations; knowing this, that the trying of your faith worketh patience.', 'KJV', current_date + 17),
  ('Psalm 55:22', 'Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.', 'KJV', current_date + 18),
  ('Matthew 6:33', 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.', 'KJV', current_date + 19),
  ('Psalm 37:4', 'Delight thyself also in the LORD: and he shall give thee the desires of thine heart.', 'KJV', current_date + 20),
  ('1 Peter 5:7', 'Casting all your care upon him; for he careth for you.', 'KJV', current_date + 21),
  ('Psalm 16:8', 'I have set the LORD always before me: because he is at my right hand, I shall not be moved.', 'KJV', current_date + 22),
  ('Isaiah 41:10', 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.', 'KJV', current_date + 23),
  ('Psalm 139:14', 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works.', 'KJV', current_date + 24),
  ('Colossians 3:23', 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.', 'KJV', current_date + 25),
  ('Philippians 4:6-7', 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', 'KJV', current_date + 26),
  ('Psalm 30:5', 'Weeping may endure for a night, but joy cometh in the morning.', 'KJV', current_date + 27),
  ('Nehemiah 8:10', 'The joy of the LORD is your strength.', 'KJV', current_date + 28),
  ('Psalm 31:24', 'Be of good courage, and he shall strengthen your heart, all ye that hope in the LORD.', 'KJV', current_date + 29),
  ('Habakkuk 3:19', 'The LORD God is my strength, and he will make my feet like hinds'' feet, and he will make me to walk upon mine high places.', 'KJV', current_date + 30),
  ('3 John 1:2', 'Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.', 'KJV', current_date + 31),
  ('Ecclesiastes 4:9-10', 'Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow.', 'KJV', current_date + 32),
  ('Romans 12:1', 'I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.', 'KJV', current_date + 33),
  ('Psalm 118:24', 'This is the day which the LORD hath made; we will rejoice and be glad in it.', 'KJV', current_date + 34),
  ('Psalm 28:7', 'The LORD is my strength and my shield; my heart trusted in him, and I am helped.', 'KJV', current_date + 35),
  ('1 Corinthians 6:19-20', 'Know ye not that your body is the temple of the Holy Ghost which is in you? Therefore glorify God in your body.', 'KJV', current_date + 36),
  ('Psalm 121:7-8', 'The LORD shall preserve thee from all evil: he shall preserve thy soul. The LORD shall preserve thy going out and thy coming in.', 'KJV', current_date + 37),
  ('Deuteronomy 31:6', 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.', 'KJV', current_date + 38),
  ('Psalm 103:1', 'Bless the LORD, O my soul: and all that is within me, bless his holy name.', 'KJV', current_date + 39)
on conflict (feature_date) do nothing;
