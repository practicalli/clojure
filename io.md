# IO in Clojure 


From http://blog.isaachodes.io/p/clojure-io-p1/

The Ins and Outs of Clojure: Part I
November 13, 2010

(Written about Clojure 1.2.)

It is a truth universally acknowledged, that a programmer using Clojure will want to perform IO. Let me help you out (put).

I’ll go over some of the basics of IO, focusing on what you can use Clojure to do directly. I’ll move on after the basic introduction, to some of the more interesting and generally useful classes that Java offers, giving a little context for each.
In

Reading files in is generally one of the first things I want to do when playing with a new language, so I’ll start there. Before I get started though, I should mentioned that in Clojure, strings are always encoded using UTF-16. Generally this saves time and worry, but it’s something to keep in mind should you run into problems on the encoding front.
slurp

Clojure comes with a handy little function called slurp that takes in a string representing a filename (or, really, pretty much anything; a File, a stream, a byte array, URL, etc) and returns a string containing the contents of your file. It’s pretty handy if you just need to get some information from a file that’s relatively small, and you’ll be parsing it yourself.

(slurp "/Users/ihodes/Desktop/afile.txt")
=> "A little bit\nof information here."

A nice thing about slurp is that you can easily build up file paths with str. For example, say you want to output to a file based on information you find at runtime:

(slurp (str "/Users/" username "/Desktop/" filename))

But slurp is pretty basic, and once your files get large enough, totally impractical. Nonetheless, it’s a handy function to know about.

As a useful and comical aside, the function spit is the counterpart to slurp, except that instead of reading input, spit does output. More on this in a future article, though.
line-seq

One of my favorite IO functions has got to be line-seq; line-seq takes a reader object (which must implement BufferedReader) and returns a lazy sequence of the lines of the text the reader supplies. This is handy when you’re dealing with files (if this offends you, let’s be Unixy here for now and say that everything is a file) that are too big to merely slurp, but that are \newline delimited (or CR/LF delimited, if you’re of the Windows persuasion).

(use '[clojure.java.io '(reader)])
(take 2
  (line-seq (reader "bobby.txt")))
=> ("Bobby was a good boy," "and didn't complain too much")

Notice how we take 2 from the sequence we get from using line-seq. We can take as much or as little as we need; we won’t be reading much (Clojure will read a bit more than you tell it to in order to get more IO performance, but let’s not worry about that) more than we specify. We can do anything we want with the resulting seq; that’s the beauty of line-seq and the ubiquitous sequence abstraction.

Back in the day, Clojurists had to sink a little lower than the clojure.java.io namespace to use line-seq; two Java classes were needed. One of these Java classes is the most wondrous and amazing thing just below the surface of the more elegant and beautiful Clojure code; BufferedReader. Here’s how we used to do it;

(import '(java.io FileReader BufferedReader))
(take 2
  (line-seq (BufferedReader.
              (FileReader. "bobby.txt")))
=> ("Bobby was a good boy," "and didn't complain too much")

This might give you a better sense of what’s going on when you use reader, though in reality reader is far more complicated than just that: you can trust it to handle a variety of “readable things” and return to you a BufferedReader if possible.

FileReader will return a Reader on a file, and BufferedReader takes and buffers a Reader, as you might have extrapolated from the name. Readers are basically just objects upon which a few methods (like read, skip and close) may be enacted and expected to return reasonable results. line-seq essentially reads up until a line-delimiter and returns the read chunk as an element in the sequence it is generating.

While on the subject of files, I should probably mentioned the file function, from clojure.java.io. file takes in an arbitrary number of string arguments, and pieces them together into a file hierarchy, returning a File instance. This can come in handy.
Rivers? inputStreams? Brooks?

Streams are an especially useful class of readers. Oftentimes you’re reading in text; that’s what Readers do. But often you need to read in a stream of bytes; that’s where you need to use clojure.java.io’s input-stream.

(use '[clojure.java.io '(reader)])
(def g (input-stream "t.txt"))
(.read g)
=> 105
(.read g)
=> 115
(char (.read g))
=> \space

As you can see, instead of getting characters from this file (like we get when we use a reader), we’re getting integer byte values. This can be useful when reading, for example, a media file.

In general, strings are always UTF-16, which are 16-bit pieces of data, whereas byte-streams are 8-bit pieces of data. It bears repeating that the stream operators should be used when you’re not dealing with strings: they are not trivially interchangeable, as they might be in other languages where strings are syntactic sugar for byte arrays.
RandomAccessFile

Finally, let me introduce to you a spectacularly useful Java class. RandomAccessFile is a class which allows you to quickly jump around in a large file, and read bytes from it.

(import '(java.io RandomAccessFile))
(def f (RandomAccessFile. "stuff.txt" "r"))

Note the second argument of the constructor, “r”; this indicates that we’re opening the file just for reading. Now that we have f, we can use it to navigate and read the file:

(.read f)
=> 105
(.length f)
=> 2015 ;; this is the number of bytes this file is in length
(.skipBytes f 20)
(.getFilePointer h)
=> 21 ;; the position we're at in the file
(.read f)
=> 89

As you can see, you can jump around (quickly!) through a file, and read from the parts you want, and skip the parts you do not want. The key methods/functions here (among many others that can also be useful; be sure to check the documentation) are read, length, skipBytes, seek and getFilePointer.
Closing

Every file that is opened should be closed, and what we’ve been doing is a little unsafe. In order to close an open reader/file, we should use the close method on it; in the above example, when you’re done with f, simply execute (.close f) to tell the file system that you’re done with the file. Alternatively, and more idiomatically, you can open your files with the handy with-open binder:

(with-open [f (RandomAccessFile. "stuff.txt" "r")]
  (.read f))

When you’re done with f, Clojure will close it, and you won’t have to worry one iota about it.
Digging Deeper

Should slurp and line-seq not be enough for your reading needs (and chances are that, should you code enough in Clojure, they won’t always been), you might want to explore clojure.java.io some more, as well as some of the Java classes (namely, those stemming from Reader and BufferedReader, as well as InputStream and BufferedInputStream) mentioned above. See my previous article on using Java if you’re unfamiliar with using Java.

Next up is an introduction to the “outs” of Clojure and Java. Stay tuned!

I owe a big thank you to Phil Hagelberg for reading over this essay and offering advice. If you don’t already, you should be using his Leiningen for both dependency management and a stress-free development environment.

The Ins and Outs of Clojure: Part I
November 13, 2010

(Written about Clojure 1.2.)

It is a truth universally acknowledged, that a programmer using Clojure will want to perform IO. Let me help you out (put).

I’ll go over some of the basics of IO, focusing on what you can use Clojure to do directly. I’ll move on after the basic introduction, to some of the more interesting and generally useful classes that Java offers, giving a little context for each.
In

Reading files in is generally one of the first things I want to do when playing with a new language, so I’ll start there. Before I get started though, I should mentioned that in Clojure, strings are always encoded using UTF-16. Generally this saves time and worry, but it’s something to keep in mind should you run into problems on the encoding front.
slurp

Clojure comes with a handy little function called slurp that takes in a string representing a filename (or, really, pretty much anything; a File, a stream, a byte array, URL, etc) and returns a string containing the contents of your file. It’s pretty handy if you just need to get some information from a file that’s relatively small, and you’ll be parsing it yourself.

(slurp "/Users/ihodes/Desktop/afile.txt")
=> "A little bit\nof information here."

A nice thing about slurp is that you can easily build up file paths with str. For example, say you want to output to a file based on information you find at runtime:

(slurp (str "/Users/" username "/Desktop/" filename))

But slurp is pretty basic, and once your files get large enough, totally impractical. Nonetheless, it’s a handy function to know about.

As a useful and comical aside, the function spit is the counterpart to slurp, except that instead of reading input, spit does output. More on this in a future article, though.
line-seq

One of my favorite IO functions has got to be line-seq; line-seq takes a reader object (which must implement BufferedReader) and returns a lazy sequence of the lines of the text the reader supplies. This is handy when you’re dealing with files (if this offends you, let’s be Unixy here for now and say that everything is a file) that are too big to merely slurp, but that are \newline delimited (or CR/LF delimited, if you’re of the Windows persuasion).

(use '[clojure.java.io '(reader)])
(take 2
  (line-seq (reader "bobby.txt")))
=> ("Bobby was a good boy," "and didn't complain too much")

Notice how we take 2 from the sequence we get from using line-seq. We can take as much or as little as we need; we won’t be reading much (Clojure will read a bit more than you tell it to in order to get more IO performance, but let’s not worry about that) more than we specify. We can do anything we want with the resulting seq; that’s the beauty of line-seq and the ubiquitous sequence abstraction.

Back in the day, Clojurists had to sink a little lower than the clojure.java.io namespace to use line-seq; two Java classes were needed. One of these Java classes is the most wondrous and amazing thing just below the surface of the more elegant and beautiful Clojure code; BufferedReader. Here’s how we used to do it;

(import '(java.io FileReader BufferedReader))
(take 2
  (line-seq (BufferedReader.
              (FileReader. "bobby.txt")))
=> ("Bobby was a good boy," "and didn't complain too much")

This might give you a better sense of what’s going on when you use reader, though in reality reader is far more complicated than just that: you can trust it to handle a variety of “readable things” and return to you a BufferedReader if possible.

FileReader will return a Reader on a file, and BufferedReader takes and buffers a Reader, as you might have extrapolated from the name. Readers are basically just objects upon which a few methods (like read, skip and close) may be enacted and expected to return reasonable results. line-seq essentially reads up until a line-delimiter and returns the read chunk as an element in the sequence it is generating.

While on the subject of files, I should probably mentioned the file function, from clojure.java.io. file takes in an arbitrary number of string arguments, and pieces them together into a file hierarchy, returning a File instance. This can come in handy.
Rivers? inputStreams? Brooks?

Streams are an especially useful class of readers. Oftentimes you’re reading in text; that’s what Readers do. But often you need to read in a stream of bytes; that’s where you need to use clojure.java.io’s input-stream.

(use '[clojure.java.io '(reader)])
(def g (input-stream "t.txt"))
(.read g)
=> 105
(.read g)
=> 115
(char (.read g))
=> \space

As you can see, instead of getting characters from this file (like we get when we use a reader), we’re getting integer byte values. This can be useful when reading, for example, a media file.

In general, strings are always UTF-16, which are 16-bit pieces of data, whereas byte-streams are 8-bit pieces of data. It bears repeating that the stream operators should be used when you’re not dealing with strings: they are not trivially interchangeable, as they might be in other languages where strings are syntactic sugar for byte arrays.
RandomAccessFile

Finally, let me introduce to you a spectacularly useful Java class. RandomAccessFile is a class which allows you to quickly jump around in a large file, and read bytes from it.

(import '(java.io RandomAccessFile))
(def f (RandomAccessFile. "stuff.txt" "r"))

Note the second argument of the constructor, “r”; this indicates that we’re opening the file just for reading. Now that we have f, we can use it to navigate and read the file:

(.read f)
=> 105
(.length f)
=> 2015 ;; this is the number of bytes this file is in length
(.skipBytes f 20)
(.getFilePointer h)
=> 21 ;; the position we're at in the file
(.read f)
=> 89

As you can see, you can jump around (quickly!) through a file, and read from the parts you want, and skip the parts you do not want. The key methods/functions here (among many others that can also be useful; be sure to check the documentation) are read, length, skipBytes, seek and getFilePointer.
Closing

Every file that is opened should be closed, and what we’ve been doing is a little unsafe. In order to close an open reader/file, we should use the close method on it; in the above example, when you’re done with f, simply execute (.close f) to tell the file system that you’re done with the file. Alternatively, and more idiomatically, you can open your files with the handy with-open binder:

(with-open [f (RandomAccessFile. "stuff.txt" "r")]
  (.read f))

When you’re done with f, Clojure will close it, and you won’t have to worry one iota about it.
Digging Deeper

Should slurp and line-seq not be enough for your reading needs (and chances are that, should you code enough in Clojure, they won’t always been), you might want to explore clojure.java.io some more, as well as some of the Java classes (namely, those stemming from Reader and BufferedReader, as well as InputStream and BufferedInputStream) mentioned above. See my previous article on using Java if you’re unfamiliar with using Java.

Next up is an introduction to the “outs” of Clojure and Java. Stay tuned!

I owe a big thank you to Phil Hagelberg for reading over this essay and offering advice. If you don’t already, you should be using his Leiningen for both dependency management and a stress-free development environment.
